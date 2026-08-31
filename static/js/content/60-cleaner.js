/* ============================================================
   POSITION 60  Cleaner Assistant
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
  throw new Error('content/shared.js must load before 60-cleaner.js - check the <script> order in index.html');
}

CONTENT.positions["60"] = {
  num: "60",
  name: "Cleaner Assistant",
  icon: "🧹",
  blurb: "Machines, towels, touchpoints, patron counts and the task tracker.",

  /* Scenarios only this position is asked */
  scenarios: [
    {
      id: "cl1", zone: "Lower Fit", tag: "Supplies",
      text: "You are wiping down the metal frame and handles of a leg press. Which product?",
      options: [
        { t: "Split, for metal parts.", correct: true },
        { t: "Deoclean, that is for nonmetal parts.", correct: false },
        { t: "Dust, that is for railings and floor clusters.", correct: false },
        { t: "Whatever bottle is on the cart.", correct: false }
      ],
      teach: "Deoclean is for nonmetal parts. Split is for metal parts. Cleaning rags are for wiping down used equipment machines. Dust is for railings and the cluster on the ground."
    },

    {
      id: "cl2", zone: "Laundry", tag: "Towels",
      text: "You have finished a round with the yellow buggy full of used microfibers. Where do the dirty cleaning rags go?",
      options: [
        { t: "The blue bin at the Welcome Desk.", correct: false },
        { t: "The white bin behind the FitWell desk, never the patron towel bin.", correct: true },
        { t: "Straight into the washing machine.", correct: false },
        { t: "Back on the cart for reuse.", correct: false }
      ],
      teach: "Cleaning rags come from the towel rack behind the FitWell desk in the laundry room and go back into the WHITE bin behind the FitWell desk. Used PATRON towels are stored at the Welcome Desk in a BLUE bin. Never use patron towels or microfibers meant for patrons to clean the machines."
    },

    {
      id: "cl3", zone: "Upper Fit", tag: "Cleaning",
      text: "You are cleaning a row of cardio machines and you are behind schedule.",
      options: [
        { t: "Hit the handles and screens, that is what patrons touch.", correct: false },
        { t: "Clean the entire machine, not just the spots patrons touch.", correct: true },
        { t: "Skip the row and log it anyway.", correct: false },
        { t: "Ask 61 to finish the row.", correct: false }
      ],
      teach: "Clean the entire machine, not just where the patron touches. Cleaning areas include upper and lower fit floors, both cardio areas, circuit, studios, track, courts and touchpoints (railings, baseboards, cubbies, doorknobs, tables and chairs)."
    },

    {
      id: "cl4", zone: "iPad", tag: "Task Tracker",
      text: "You finished cleaning the Circuit area. Time to log it.",
      options: [
        { t: "Log into the iPad (6720480), open Safari, pick the location under Favorites, then fill in name, date, day of week and what you cleaned, matching your scheduled shift time.", correct: true },
        { t: "Tell your supervisor and let them log it.", correct: false },
        { t: "Write it on the laminated patron count sheet.", correct: false },
        { t: "Log it at the end of the shift for every area at once.", correct: false }
      ],
      teach: "Cleaning Task Tracker: iPad password 6720480, then Safari, then pick your area under Favorites to open the Microsoft Form. Enter first and last name, date, day of the week, and the equipment or machine area you cleaned. Select the area that corresponds with your scheduled shift time."
    },

    {
      id: "cl5", zone: "Facility", tag: "Counts",
      text: "You are walking your route and need to record patron counts.",
      options: [
        { t: "Count patrons in each location and write it on the laminated patron count sheet.", correct: true },
        { t: "Enter the numbers into the Excel sheet yourself.", correct: false },
        { t: "Estimate at the end of the night from memory.", correct: false },
        { t: "Radio the numbers to 855.", correct: false }
      ],
      teach: "Count patrons in Lower Fitness Floor, Weight-room, Upper Fitness Floor, MPG, Courts and Circuit, and write the number on the laminated patron count sheet. The supervisor on shift adds the numbers to the Excel sheet at closing hour."
    },

    {
      id: "cl6", zone: "Locker Room", tag: "BBP",
      text: "There is a blood spill on the locker room floor.",
      options: [
        { t: "Grab the BBP kit (FitWell desk, Aquatics office, Welcome Desk, Tri Rec, Rockwall), glove up and follow BBP procedure.", correct: true },
        { t: "Mop it with the regular mop and Deoclean.", correct: false },
        { t: "Put a wet floor sign over it until closing.", correct: false },
        { t: "Use patron towels to soak it up.", correct: false }
      ],
      teach: "BBP kits are at the FitWell Desk, the Aquatics office, the Welcome Desk, Tri Rec and the Rockwall, and contain everything needed for spills and bodily fluids. Fecal matter does NOT go in the BBP bin, it goes in large black trash bags out to the dumpsters immediately."
    },

    {
      id: "cl7", zone: "Locker Room", tag: "Closing",
      text: "You are sent to close the locker rooms.",
      options: [
        { t: "Gloves on, then trash and microfibers, lost items to the sup, saunas and their interior lights off, lockers open and cleared, and everyone out.", correct: true },
        { t: "Quick trash sweep and lock the doors.", correct: false },
        { t: "Leave the saunas running for the morning.", correct: false },
        { t: "Close it up and head out, the sup will check later.", correct: false }
      ],
      teach: "Locker room closing: wear gloves. Pick up trash and unused microfibers, collect lost items and notify your supervisor, make sure saunas AND their interior lights are off, check lockers are open, cleared and ready, and make sure all patrons have exited. Then notify your supervisor for a final check before leaving."
    },

    {
      id: "cl8", zone: "Laundry", tag: "Ice",
      text: "The sup asks you to bring ice for an injured patron.",
      options: [
        { t: "Grab a plastic ice bag, use the cup inside the machine to scoop, fill it, seal it, return the cup and leave the area clean.", correct: true },
        { t: "Scoop it with your hands into a patron towel.", correct: false },
        { t: "Use a paper cup from the Welcome Desk to scoop.", correct: false },
        { t: "Take the ice from the vending area.", correct: false }
      ],
      teach: "The ice machine is in the laundry room behind the FitWell Desk, to the left of the washing machine. Use a plastic ice bag from the pouch and the plastic cup placed inside the machine, never your hands. Fill enough to cover the injured area, seal the bag, return the scoop and leave it clean. No ice? Notify your supervisor on shift."
    }
  ],

  /* Closing checklist for this position.
 ok:false items are traps and should carry a "why". */
  closing: {
    title: "Cleaner Closing",
    items: [
      { t: "Fully stock the cart with clean microfibers and patron towels", ok: true },
      { t: "Walk the facility with the yellow buggy collecting used microfibers", ok: true },
      { t: "Return the collected towels to the laundry room", ok: true },
      { t: "Wear gloves any time you handle used towels or micros", ok: true },
      { t: "Log every area you cleaned in the Cleaning Task Tracker on the iPad", ok: true },
      {
        t: "Use patron towels to wipe down machines", ok: false,
        why: "Never use patron towels or microfibers meant for patrons to clean the machines."
      },
      {
        t: "Drop cleaning rags in the patron towel bin", ok: false,
        why: "Cleaning rags go in the white bin behind the FitWell desk."
      }
    ]
  }
};
