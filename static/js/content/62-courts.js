/* ============================================================
   POSITION 62  Court Assistant
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
  throw new Error('content/shared.js must load before 62-courts.js - check the <script> order in index.html');
}

CONTENT.positions["62"] = {
  num: "62",
  name: "Court Assistant",
  icon: "🏀",
  blurb: "Courts 1-4, racquetball and the MPG. Keep walking all four courts.",

  /* Scenarios only this position is asked */
  scenarios: [
    {
      id: "ct1", zone: "Court 4", tag: "Priority",
      text: "A full-court basketball game is running on Court 4 and a group posts a request for badminton.",
      options: [
        { t: "Basketball has the court until they choose to leave.", correct: false },
        { t: "Let the current game end plus one more winner game, then badminton takes Court 4.", correct: true },
        { t: "Stop the game right now and set up the net.", correct: false },
        { t: "Tell the badminton group to try Court 3.", correct: false }
      ],
      teach: "Badminton takes priority on Court 4. Upon notification, the existing basketball game is permitted to end and play one more winner game, then the court goes to badminton."
    },

    {
      id: "ct2", zone: "Court 3", tag: "Priority",
      text: "Patrons want to play volleyball on Court 3, but a half-court basketball game is already going there.",
      options: [
        { t: "Both can share Court 3.", correct: false },
        { t: "Court 3 is the volleyball court. Basketball cannot run at the same time, so move the basketball players to another court.", correct: true },
        { t: "Volleyball waits until basketball finishes for the day.", correct: false },
        { t: "Send the volleyball group to the MPG.", correct: false }
      ],
      teach: "Court 3 priority order: Intramurals, Leagues and Youth Programs, Sport Clubs then Facility Rental. If patrons are trying to play volleyball, people cannot be playing basketball on Court 3 at the same time."
    },

    {
      id: "ct3", zone: "Court 2", tag: "Fight",
      text: "Two patrons start throwing punches on Court 2.",
      options: [
        { t: "\"62 to all available staff, come to Court 2 right now\", then contain, do not touch, do not let anyone leave.", correct: true },
        { t: "Step between them and pull them apart.", correct: false },
        { t: "Radio 866 \"as soon as possible\".", correct: false },
        { t: "Clear the court and let them settle it outside.", correct: false }
      ],
      teach: "Fights mean \"all available staff\" to YOUR specific location, with no pause. DO NOT get in the middle, CONTAIN the fight. Try not to touch the patrons. Do not let anyone leave, get names, ask bystanders, keep a description of what they were wearing, and look for head blows, bleeding or injuries."
    },

    {
      id: "ct4", zone: "Courts", tag: "Supervision",
      text: "Court 1 is the busiest, so you post up there for the hour to keep an eye on the game.",
      options: [
        { t: "Smart, go where the action is.", correct: false },
        { t: "Walk between all four courts instead of standing at one, so your eyes cover the whole area.", correct: true },
        { t: "Stand on the railing above to see everything.", correct: false },
        { t: "Ask 61 to watch the other courts.", correct: false }
      ],
      teach: "Walk between ALL 4 courts and do not station yourself at one. Walking the entire court area keeps supervision on every court and lets you spot risk management issues and things out of place."
    },

    {
      id: "ct5", zone: "Courts", tag: "Equipment",
      text: "You find a loose SRWC basketball sitting on the ground under the hoop, unused.",
      options: [
        { t: "Leave it, someone will pick it up.", correct: false },
        { t: "Pick it up, radio 55 to the railing, and safely toss the ball up to them.", correct: true },
        { t: "Take it to the Sup Bowl with the lost and found.", correct: false },
        { t: "Put it in the ball bin on the court.", correct: false }
      ],
      teach: "When unused SRWC equipment is found on the ground, pick up the item and radio 55 to the railing. Once 55 is there, safely toss the ball up to the staff member so it is back available for patron usage."
    },

    {
      id: "ct6", zone: "Courts", tag: "Policy",
      text: "A patron is playing hard in flat-soled black street sneakers that are scuffing the hardwood.",
      options: [
        { t: "Non-marking court shoes are required on hardwood, so ask them to change.", correct: true },
        { t: "Any closed-toe shoe is fine on the court.", correct: false },
        { t: "Only an issue during intramurals.", correct: false },
        { t: "Let them finish the game first.", correct: false }
      ],
      teach: "Non-marking court shoes are required at all times while on hardwood floors."
    },

    {
      id: "ct8", zone: "Court 4", tag: "Nets",
      text: "Basketball players ask you to take down the badminton net on Court 4 so they can play.",
      options: [
        { t: "Take it down for them, easy fix.", correct: false },
        { t: "They have to ask the supervisor. If it comes down, it goes back up the moment someone wants badminton, and the basketball players move courts.", correct: true },
        { t: "Tell them the net never comes down.", correct: false },
        { t: "Take it down and leave it down for the rest of the night.", correct: false }
      ],
      teach: "Patrons must ask the supervisor to take the Court 4 net down, and it must be put back up when someone wants to play badminton. At that point those playing basketball must stop and move to another court."
    },

    {
      id: "ct9", zone: "Courts", tag: "Closing",
      text: "Closing time on courts. Someone left an earbuds case and a water bottle on the bleachers.",
      options: [
        { t: "Toss both in the trash.", correct: false },
        { t: "Trash goes out, the earbuds case goes to the Sup Bowl in the white bin above Safe 2, and you tell your supervisor you are doing it.", correct: true },
        { t: "Leave the case where it is so they can find it.", correct: false },
        { t: "Take the case to the Welcome Desk.", correct: false }
      ],
      teach: "Court closing: collect all SRWC equipment back to the Welcome Desk, clear trash and bottles from the courts and MPG, and take lost items to the Sup Bowl white bin above Safe 2, always notifying your supervisor when you do."
    },

    {
      id: "ct10", zone: "MPG", tag: "Emergency",
      text: "During an intramural game a player goes down hard and a crowd of spectators closes in around them.",
      options: [
        { t: "Stay calm and firm, move bystanders back, keep hallway pathways clear for emergency personnel, and update the sup and spec.", correct: true },
        { t: "Let their teammates handle it, IM staff have it covered.", correct: false },
        { t: "Clear the entire building.", correct: false },
        { t: "Stand back so you do not get in the way.", correct: false }
      ],
      teach: "Crowd control: calm, firm and respectful. Clear the area, guide patrons back, and maintain clear pathways in the hallways for emergency personnel. Give updates to the supervisor and specialist, and prevent re-entry until they reopen the area."
    }
  ],

  /* Closing checklist for this position.
 ok:false items are traps and should carry a "why". */
  closing: {
    title: "Court Closing",
    items: [
      { t: "Return all SRWC equipment to the Welcome Desk and check its condition", ok: true },
      { t: "Pick up trash, water bottles and anything left on the courts and MPG", ok: true },
      { t: "Lost items to the Sup Bowl white bin above Safe 2, and tell your sup", ok: true },
      { t: "Set nets up or store them based on morning events or general use", ok: true },
      { t: "Notify your supervisor once court closing tasks are done", ok: true },
      {
        t: "Head out once the courts are clean", ok: false,
        why: "Notify your supervisor first. They may direct you to locker room checks or other closing responsibilities."
      },
      {
        t: "Leave lost items on the bleachers so patrons can find them", ok: false,
        why: "Lost and found goes to the Sup Bowl, in the white bin above Safe 2."
      }
    ]
  }
};
