type Transitions<TState extends string, TEvent extends string> = Partial<
  Record<TState, Partial<Record<TEvent, TState>>>
>;

export class StateMachine<TState extends string, TEvent extends string> {
  private current: TState;
  private transitions: Transitions<TState, TEvent>;

  constructor(initial: TState, transitions: Transitions<TState, TEvent>) {
    this.current = initial;
    this.transitions = transitions;
  }

  get state(): TState {
    return this.current;
  }

  send(event: TEvent): boolean {
    const next = this.transitions[this.current]?.[event];
    if (!next) return false;
    this.current = next;
    return true;
  }

  can(event: TEvent): boolean {
    return !!this.transitions[this.current]?.[event];
  }
}
