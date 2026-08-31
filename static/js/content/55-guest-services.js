/* ============================================================
   POSITION 55  Guest Services Assistant
   ------------------------------------------------------------
   Loaded after content/shared.js, which creates CONTENT.
   Everything this position needs lives here: its title-card
   details, its own Round 4 scenarios, and its Round 5 closing
   checklist.

   To add another position, copy this whole file, rename it,
   change the number and content, then add a <script> tag for
   it in index.html next to the others.
   ============================================================ */

/* shared.js must load first - it creates CONTENT. */
if (typeof CONTENT === 'undefined') {
  throw new Error('content/shared.js must load before 55-guest-services.js - check the <script> order in index.html');
}

CONTENT.positions["55"] = {
  num: "55",
  name: "Guest Services Assistant",
  icon: "🛎️",
  blurb: "Welcome Desk access control, equipment issue, Win-Pak alarms and the 911 call.",

  /* Scenarios only this position is asked */
  scenarios: [
    {
      id: "gs1", zone: "Welcome Desk", tag: "Access",
      text: "A patron swipes in and Fusion flags the account as PNG.",
      options: [
        { t: "Politely direct them to the GSS side with an excuse, then radio 66 with an \"as soon as possible\" call.", correct: true },
        { t: "Explain to them that they are PNG and cannot enter the facility.", correct: false },
        { t: "Let them in and mention it to your supervisor later.", correct: false },
        { t: "Refuse entry and hold your ground until they leave.", correct: false }
      ],
      teach: "PNG: politely direct the patron to the GSS side with an excuse and radio 66 with an ASAP call. Do not argue or escalate the situation."
    },

    {
      id: "gs2", zone: "Welcome Desk", tag: "Access",
      text: "A patron's card swipe comes back Person Not Found.",
      options: [
        { t: "Retry the swipe, wipe off the card, search them manually in Fusion, and contact the GSS or supervisor if it is still unresolved.", correct: true },
        { t: "Send them straight to the GSS desk for a replacement card.", correct: false },
        { t: "Wave them through and sort it out afterwards.", correct: false },
        { t: "Tell them their membership has expired.", correct: false }
      ],
      teach: "Person Not Found: retry the card swipe, wipe off the card, then search the patron manually in Fusion. If it is still unresolved, contact the GSS or supervisor."
    },

    {
      id: "gs3", zone: "Welcome Desk", tag: "Access",
      text: "Fusion shows the patron's account is suspended.",
      options: [
        { t: "Open the member profile, click the Access tab, click View under log to read the suspension note, then politely explain the issue.", correct: true },
        { t: "Tell them to come back another day.", correct: false },
        { t: "Let them in, the suspension is probably old.", correct: false },
        { t: "Radio 66 immediately and stop checking anyone in.", correct: false }
      ],
      teach: "Suspended: open the member profile, click the Access tab, then click View under log for the suspension note and politely explain the issue to the patron. Refer them to the GSS or supervisor if needed."
    },

    {
      id: "gs4", zone: "Win-Pak", tag: "Alarms",
      text: "A red bar appears in Win-Pak and the computer starts beeping.",
      options: [
        { t: "\"55 to 66 please be advised: [name of alarm] is going off.\" No pause needed.", correct: true },
        { t: "Acknowledge the alarm to stop the beeping, then radio 66.", correct: false },
        { t: "\"55 to 66?\" then pause and wait for a response before continuing.", correct: false },
        { t: "Silence it and see whether it happens again.", correct: false }
      ],
      teach: "It is the GSA's responsibility to alert the facility supervisor. Say \"55 to 66 please be advised: [name of alarm] is going off.\" You do not need to pause on this call. You may hit SILENCE to pause the beeping for 30 seconds while you wait for direction."
    },

    {
      id: "gs5", zone: "Win-Pak", tag: "Alarms",
      text: "The alarm is still beeping and patrons at the desk are noticing. The supervisor has not radioed back yet.",
      options: [
        { t: "Hit SILENCE for 30 seconds and wait. Only acknowledge once 66 tells you to.", correct: true },
        { t: "Select the alarm and hit ACK to clear it.", correct: false },
        { t: "Turn the Win-Pak volume down until the supervisor arrives.", correct: false },
        { t: "Close Win-Pak and reopen it.", correct: false }
      ],
      teach: "SILENCE pauses the beeping for 30 seconds. Do NOT acknowledge until the supervisor has re-armed the door and radios you: \"66 to 55, you can go ahead and acknowledge that alarm.\" Only then select the alarm name and hit ACK. Win-Pak stays pulled up with the volume at 100%."
    },

    {
      id: "gsp6", zone: "Win-pak", tag: "Alarms",
      text: "An alarm is beeping (with a trumpet sound).",
      options: [
        { t: "\"55 to 66 please be advised: [name of alarm] is going off.\" No pause needed.", correct: true },
        { t: "Acknowledge the alarm to stop the beeping, then radio 66.", correct: false },
        { t: "\"55 to 66?\" then pause and wait for a response before continuing.", correct: false },
        { t: "\"55 to 66 [location of the alarm] immediately.\" No pause needed", correct: false }
      ],
      teach: "Door alarms and Help alarms are different. Help alarm is a medical emergency hence an immediately call"
    },

    {
      id: "gs7", zone: "Welcome Desk", tag: "EMS",
      text: "66 radios: \"call EMS immediately, we have a 21-year-old patron having a seizure on the courts.\" You have just finished giving the operator the details.",
      options: [
        { t: "Wait for the 911 operator to hang up first, then radio \"55 to 66, EMS is on their way.\"", correct: true },
        { t: "Hang up once you have given the information and get back to checking patrons in.", correct: false },
        { t: "Hand the phone to the next staff member at the desk.", correct: false },
        { t: "Stay on the line until EMS physically arrives.", correct: false }
      ],
      teach: "55 ALWAYS waits for the 911 operator to hang up first. Gather the information over the radio before calling, introduce yourself using the prompt on the 911 call sheet, and once the operator hangs up, radio 66 that EMS is on the way. If the operator asks something you do not know, say so and radio the supervisor."
    },

    {
      id: "gs8", zone: "Equipment Issue", tag: "Equipment",
      text: "A patron returns a basketball with a split seam and waits for you to check it back in.",
      options: [
        { t: "Explain you cannot check it in, leave it checked out under their name, and alert 866/858 with a \"when you get the chance\" call.", correct: true },
        { t: "Check it in and note the damage on the account.", correct: false },
        { t: "Check it in and put it straight into the damaged bin.", correct: false },
        { t: "Refuse the return and send the patron away with the ball.", correct: false }
      ],
      teach: "Do NOT check damaged equipment back in - leave it checked out under the patron's name. Explain why, and offer the Guest Services business card if they are defensive. Alert 866/858 with a \"when you get the chance\" call, fill out the Broken/Lost Equipment form on the OPS/GS iPad, and put the item in the Broken & Damaged Equipment bin in the SupBowl."
    },

    {
      id: "gs9", zone: "Welcome Desk", tag: "Access",
      text: "A patron swipes in with a card whose profile photo is clearly not them.",
      options: [
        { t: "Politely stop them, verify the identity of both the patron and the cardholder, radio your supervisor to the desk ASAP, and dont give the card back.", correct: true },
        { t: "Let them in and note it on the account.", correct: false },
        { t: "Ask them to bring their own card next time.", correct: false },
        { t: "Confiscate the card and handle it yourself.", correct: false }
      ],
      teach: "Misuse of a member ID or FLASHcard: politely stop the patron from entering, verify the identity of the patron misusing the card and of the cardholder, radio your supervisor to the Welcome Desk as soon as possible, and confiscate the card."
    },

    {
      id: "gs10", zone: "Welcome Desk", tag: "Access",
      text: "Someone walks straight past the turnstiles without swiping.",
      options: [
        { t: "Stop them, ask them to swipe in at the turnstiles, and explain the facility access policy.", correct: true },
        { t: "Let it go, they are probably here for a program.", correct: false },
        { t: "Radio 66 immediately.", correct: false },
        { t: "Follow them onto the floor to check their membership.", correct: false }
      ],
      teach: "Stop the patron and ask them to swipe in at the turnstiles, then explain the access policy. Non-members do have access for programs such as swim lessons, but they are expected to stop at the Welcome Desk and tell an employee they are here for a program. Radio your supervisor if you have questions."
    },

    {
      id: "gs11", zone: "Welcome Desk", tag: "Systems",
      text: "Fusion crashes at 5:45pm with a line of patrons waiting to swipe in.",
      options: [
        { t: "Open Notepad on the Welcome Desk computer and swipe every card through the beige scanner, then check everyone in once Fusion is back.", correct: true },
        { t: "Stop admitting patrons until Fusion comes back up.", correct: false },
        { t: "Wave everyone through and move on.", correct: false },
        { t: "Write each patron's name down on paper.", correct: false }
      ],
      teach: "If Fusion breaks down, open the Notepad app on the WD computer and swipe each patron card through the beige scanner. When Fusion is back up, paste the first 12 numbers of each long code into Fusion as if you were looking up their name, and check each person in."
    },

    {
      id: "gs12", zone: "Welcome Desk", tag: "Professionalism",
      text: "It is quiet at the desk and you have a paper due tomorrow.",
      options: [
        { t: "Stay facing the non-member mall area and keep your attention on patrons entering.", correct: true },
        { t: "Get some homework done while nobody needs you.", correct: false },
        { t: "Scroll your phone below the counter where patrons cannot see.", correct: false },
        { t: "Turn around and catch up with the GSS.", correct: false }
      ],
      teach: "No personal devices and no homework at the Welcome Desk, and no cell phone use. Sit properly with your feet on the ground, keep your attention facing the non-member mall area, and never turn your back to patrons. Greet all patrons as they enter."
    },

    {
      id: "gs13", zone: "Welcome Desk", tag: "Lost and Found",
      text: "A patron hands in a water bottle that was left on the courts.",
      options: [
        { t: "Empty it at the UFF water fountain, label it with your initials and the date, and place it in the black crate above L&F Safe 1.", correct: true },
        { t: "Put it straight into the black crate above L&F Safe 1.", correct: false },
        { t: "Throw it away, water bottles are not worth logging.", correct: false },
        { t: "Log it under the Safe Items tab of the Lost and Found log.", correct: false }
      ],
      teach: "Lost water bottles: empty it completely at the water fountain in UFF, telling the GSS you are stepping away from the desk. Label it with your initials and the date logged, then place it in the black crate above L&F Safe 1. Safe Items is for tech, keys, documents and cash - not bottles."
    },
  ],

  /* Closing checklist for this position.
 ok:false items are traps and should carry a "why". */
  closing: {
    title: "Welcome Desk Closing",
    items: [
      { t: "Leave Win-Pak pulled up with the computer volume at 100%", ok: true }, // Check with Chris
      { t: "Account for every piece of checked-out equipment and towels", ok: true },
      { t: "Inspect returned equipment for damage before checking it back in", ok: true },
      { t: "Log lost items in the right tab: Safe Items, Lost IDs, or L&F (inform 66 after doing so)", ok: true },
      { t: "Refill flat basketballs and volleyballs with the blue air pump in the OPS office", ok: true },
      {
        t: "Check a damaged item back in so the queue is clear for the next shift", ok: false,
        why: "Never check damaged equipment back in. Leave it checked out under the patron's name and alert 866/858."
      },
      {
        t: "Acknowledge any remaining Win-Pak alarms so the screen is clear overnight", ok: false,
        why: "Only acknowledge an alarm once the supervisor radios you to. Until then, SILENCE only."
      },
      {
        t: "Turn the Win-Pak volume down so it does not beep overnight", ok: false,
        why: "Win-Pak should always be pulled up with the computer volume at 100%."
      }
    ]
  }
};
