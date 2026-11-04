/** Whether the logged-in user's email matches the booking's assigned TD executive. */
export function isTdBookingAssignedToUser(
  booking: {
    assignedExecutive?: { email?: string } | null;
    assignedExecutiveEmail?: string;
  },
  userEmail: string | undefined | null,
): boolean {
  const u = (userEmail || "").trim().toLowerCase();
  if (!u) return false;
  const exec = (booking.assignedExecutive?.email || booking.assignedExecutiveEmail || "").trim().toLowerCase();
  return exec === u;
}
