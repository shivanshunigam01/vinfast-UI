/** Customer line for TD booking cards (avoids showing raw mobile as the name). */
export function bookingCustomerLabel(booking: {
  customerId?: { name?: string; mobile?: string } | null;
  testDriveId?: { customerName?: string; mobile?: string } | null;
}): string {
  const mobile = (booking.customerId?.mobile || booking.testDriveId?.mobile || "").replace(/\D/g, "").slice(-10);
  const raw = (booking.customerId?.name || booking.testDriveId?.customerName || "").trim();
  if (raw && !/^customer$/i.test(raw) && !/^\d{10}$/.test(raw.replace(/\s/g, ""))) {
    if (!mobile || !raw.replace(/\D/g, "").endsWith(mobile)) return raw;
  }
  if (raw && !/^customer$/i.test(raw)) return raw;
  return mobile ? `Customer (${mobile})` : "Customer";
}
