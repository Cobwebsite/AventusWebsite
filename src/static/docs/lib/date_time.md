# Date, DateTime and Time

<mark>Aventus.Date</mark> represents a calendar day, <mark>Aventus.Time</mark> a time of day, and <mark>Aventus.DateTime</mark> both. Methods such as <mark>addDays()</mark> and <mark>with()</mark> return a new value without changing the original.

## Create and parse

```typescript filename=Example.lib.avt
const day = new Aventus.Date(2026, 11, 23);
const parsedDay = Aventus.Date.parse("2026-11-23");
const clock = Aventus.Time.parse("14:30:00");
const appointment = Aventus.DateTime.parse("2026-11-23T14:30:00");
const instant = Aventus.DateTime.parse("2026-11-23T13:30:00Z");

console.log(Aventus.Date.today, Aventus.Time.now);
console.log(Aventus.DateTime.now, Aventus.DateTime.utcNow);
```

<mark>parse()</mark> throws for invalid input; <mark>tryParse()</mark> returns <mark>null</mark>. Date uses <mark>YYYY-MM-DD</mark>, Time uses <mark>HH:mm[:ss[.fraction]]</mark>, and DateTime uses an ISO date and time with an optional <mark>Z</mark> or offset.

## Arithmetic and comparison

```typescript filename=Example.lib.avt
const nextWeek = day.addDays(7);
const monthStart = day.startOfMonth();
const later = clock.addMinutes(45); // Wraps at midnight.
const deadline = appointment.addHours(2);

console.log(day.isBefore(nextWeek));
console.log(day.daysUntil(nextWeek)); // 7; diffDays() gives the absolute value.
console.log(deadline.date, deadline.time);
```

All three types offer <mark>compareTo()</mark>, <mark>equals()</mark>, <mark>isBefore()</mark> and <mark>isAfter()</mark>. Date and DateTime also provide year, quarter, month, week and day boundaries where applicable. Time differences compare times on the same day; they do not assume an overnight interval.

## DateTime and time zones

A DateTime without an offset represents a local date and time. An input ending in <mark>Z</mark> or containing an offset represents a specific instant and is converted to UTC. Specify a time zone such as <mark>Europe/Zurich</mark> before converting a local value to a timestamp or comparing it with a UTC value.

```typescript filename=Example.lib.avt
const local = Aventus.DateTime.parse("2026-11-23T14:30:00");
const utc = local.toUtc("Europe/Zurich");
console.log(utc.toString()); // 2026-11-23T13:30:00Z
console.log(local.toTimestamp("Europe/Zurich")); // Unix milliseconds.
```

<mark>toUtc()</mark> rejects local times that are ambiguous or do not exist because of a daylight saving change. Convert both values to UTC before comparing a local DateTime with a UTC DateTime.

## Formatting and configuration

<mark>toString()</mark> and <mark>toJSON()</mark> produce ISO values. Use <mark>toLocaleString()</mark> for display, or <mark>toInputString()</mark> for HTML time and date-time inputs. <mark>configure()</mark> shares formatting and calendar defaults across the three types; it does not change ISO parsing or JSON serialization.

```typescript filename=Example.lib.avt
Aventus.Date.configure({ locale: "fr-CH", timeZone: "Europe/Zurich", firstDayOfWeek: 1 });
console.log(day.toLocaleString());
console.log(appointment.toInputString());
console.log(clock.toInputString("minute"));
```

Configuration also accepts <mark>dateFormat</mark>, <mark>dateTimeFormat</mark>, <mark>timeFormat</mark>, <mark>monthNameFormat</mark> and <mark>dayNameFormat</mark>. A supplied format object replaces the previous format object.
