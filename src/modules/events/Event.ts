type Listener<TData> = (data: TData) => void;

export class Event<TData = void> {
  private listeners: Listener<TData>[] = [];

  subscribe(listener: Listener<TData>): () => void {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter((l) => l !== listener); };
  }

  emit(data: TData): void {
    this.listeners.forEach((l) => l(data));
  }
}
