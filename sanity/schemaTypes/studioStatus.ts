import { defineArrayMember, defineField, defineType } from "sanity";

const scheduleDay = (day: string, label: string, enabled = true) => ({
  _key: day,
  day,
  label,
  enabled,
  openTime: "08:00",
  closeTime: "18:00",
});

export const studioStatusType = defineType({
  name: "studioStatus",
  title: "Studio Status",
  type: "document",
  groups: [
    { name: "schedule", title: "Weekly schedule", default: true },
    { name: "overrides", title: "Holidays & overrides" },
    { name: "notices", title: "Special notices" },
    { name: "messages", title: "Status messages" },
  ],
  initialValue: {
    timezone: "Africa/Kigali",
    weeklySchedule: [
      scheduleDay("monday", "Monday"),
      scheduleDay("tuesday", "Tuesday"),
      scheduleDay("wednesday", "Wednesday"),
      scheduleDay("thursday", "Thursday"),
      scheduleDay("friday", "Friday"),
      scheduleDay("saturday", "Saturday", false),
      scheduleDay("sunday", "Sunday", false),
    ],
    dateOverrides: [],
    specialNotices: [],
    openMessages: [
      "The Kigali studio is open and project conversations are welcome.",
      "Design, planning and coordination are active across the studio.",
      "New project inquiries are being routed to the team.",
    ],
    closedMessages: [
      "Studio closed. New inquiries will be reviewed on the next working day.",
      "After-hours inquiries are welcome and remain safely routed to IMVO.",
    ],
    weekendMessages: [
      "Weekend schedule. New project inquiries are still received.",
      "The team returns on the next working day.",
    ],
    openingSoonMessages: ["Opening soon. The Kigali studio starts at 08:00 CAT."],
  },
  fields: [
    defineField({
      name: "timezone",
      title: "Studio timezone",
      type: "string",
      group: "schedule",
      initialValue: "Africa/Kigali",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "weeklySchedule",
      title: "Weekly opening schedule",
      description: "Control normal opening days and hours. Date overrides below take priority.",
      type: "array",
      group: "schedule",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  { title: "Monday", value: "monday" },
                  { title: "Tuesday", value: "tuesday" },
                  { title: "Wednesday", value: "wednesday" },
                  { title: "Thursday", value: "thursday" },
                  { title: "Friday", value: "friday" },
                  { title: "Saturday", value: "saturday" },
                  { title: "Sunday", value: "sunday" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "label", title: "Display label", type: "string" }),
            defineField({ name: "enabled", title: "Studio open this day", type: "boolean", initialValue: true }),
            defineField({ name: "openTime", title: "Opening time", type: "string", placeholder: "08:00" }),
            defineField({ name: "closeTime", title: "Closing time", type: "string", placeholder: "18:00" }),
          ],
          preview: {
            select: { title: "label", enabled: "enabled", open: "openTime", close: "closeTime" },
            prepare({ title, enabled, open, close }) {
              return { title, subtitle: enabled ? `${open || "—"}–${close || "—"}` : "Closed" };
            },
          },
        }),
      ],
      validation: (rule) => rule.max(7),
    }),
    defineField({
      name: "dateOverrides",
      title: "Holidays / day-off / special-day overrides",
      description: "Add only dates the studio has reviewed and intends to observe. These overrides are operational content, not an automatic legal holiday calendar.",
      type: "array",
      group: "overrides",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "date", title: "Date", type: "date", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Name / reason", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "status",
              title: "Override",
              type: "string",
              options: {
                list: [
                  { title: "Closed all day", value: "closed" },
                  { title: "Open with custom hours", value: "custom" },
                  { title: "Open normal hours", value: "open" },
                ],
                layout: "radio",
              },
              initialValue: "closed",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "openTime", title: "Custom opening time", type: "string", placeholder: "09:00" }),
            defineField({ name: "closeTime", title: "Custom closing time", type: "string", placeholder: "14:00" }),
            defineField({ name: "note", title: "Public note", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "label", subtitle: "date" } },
        }),
      ],
    }),
    defineField({
      name: "specialNotices",
      title: "Special notices",
      description: "Time-boxed notices for closures, events, exceptional availability or important studio messages.",
      type: "array",
      group: "notices",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Notice title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "message", title: "Notice message", type: "text", rows: 4, validation: (rule) => rule.required() }),
            defineField({ name: "startsAt", title: "Starts", type: "datetime" }),
            defineField({ name: "endsAt", title: "Ends", type: "datetime" }),
            defineField({
              name: "priority",
              title: "Priority",
              type: "string",
              options: { list: ["normal", "important", "urgent"] },
              initialValue: "normal",
            }),
            defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
          ],
          preview: { select: { title: "title", subtitle: "message" } },
        }),
      ],
    }),
    defineField({ name: "openMessages", title: "Open-status messages", type: "array", group: "messages", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "closedMessages", title: "Closed-status messages", type: "array", group: "messages", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "weekendMessages", title: "Weekend messages", type: "array", group: "messages", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "openingSoonMessages", title: "Opening-soon messages", type: "array", group: "messages", of: [defineArrayMember({ type: "string" })] }),
  ],
  preview: { prepare: () => ({ title: "Studio Status", subtitle: "Schedule, holidays and notices" }) },
});
