import { type Role } from "@prisma/client";

export function canAccessAdmin(role: Role | undefined) {
  return role === "ADMIN";
}

export function canAccessReader(role: Role | undefined) {
  return role === "READER" || role === "ADMIN";
}
