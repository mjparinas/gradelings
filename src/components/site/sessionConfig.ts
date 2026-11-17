// Plain constants for PracticeSession. They live outside the "use client" file because a server component
// (the unit page) that imports a value from a client module gets a reference to it, not the value.

/** Questions answered before the invitation to carry on shows. */
export const SESSION_THRESHOLD = 3;
export const SAMPLE_EVENT = "Sample questions done";
