type Constructor<T = any> = new (...args: any[]) => T;
type Factory<T = any> = (container: Container) => T;

interface Binding<T = any> {
  factory: Factory<T>;
  instance?: T;
}

class Container {
  private bindings = new Map<string | symbol, Binding>();

  bind<T>(token: string | symbol, factory: Factory<T>): this {
    this.bindings.set(token, { factory });
    return this;
  }

  register<T>(token: string | symbol, ctor: Constructor<T> & { dependencies?: (string | symbol)[] }): this {
    return this.bind(token, (c) => {
      const deps = (ctor.dependencies ?? []).map((d) => c.resolve(d));
      return new ctor(...deps);
    });
  }

  bindValue<T>(token: string | symbol, value: T): this {
    this.bindings.set(token, { factory: () => value, instance: value });
    return this;
  }

  resolve<T>(token: string | symbol): T {
    const binding = this.bindings.get(token);
    if (!binding) throw new Error(`No binding found for token: ${String(token)}`);
    if (binding.instance === undefined) {
      binding.instance = binding.factory(this);
    }
    return binding.instance as T;
  }

  tryResolve<T>(token: string | symbol): T | undefined {
    try { return this.resolve<T>(token); }
    catch { return undefined; }
  }

  has(token: string | symbol): boolean {
    return this.bindings.has(token);
  }
}

export const container = new Container();
