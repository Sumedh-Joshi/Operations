/* ============================================================
   SRWC OPS: SHADOW SHIFT  --  CONTENT FILE
   ------------------------------------------------------------
   Everything the game teaches lives in this file. Nothing in
   game.js needs to change when you add content.

   HOW IT IS ORGANISED
     facility-wide   radio numbers, urgency phrases, arrival
                     times, uniform items, radio drills, badges.
                     These apply to every position.

     shared          scenarios ANY position can be asked. Use
                     this for facility-wide policies.

     positions       one self-contained block per position.
                     A position owns its metadata, its own
                     scenarios, and its own closing checklist.

   TO ADD A NEW POSITION
     Copy any block inside "positions" below, paste it, and
     change the number, name, icon, blurb, scenarios and
     closing items. That is the whole job -- it will appear on
     the title screen and be fully playable automatically.
   ============================================================ */

const CONTENT = {

  /* ==========================================================
     FACILITY-WIDE
     ========================================================== */

  /* Radio directory */
  radio: [
    { num: "844", who: "Brooke Schwerha" },
    { num: "850", who: "TRI Welcome Desk" },
    { num: "855", who: "Welcome Desk / Proshop" },
    { num: "857", who: "TRI Cleaner" },
    { num: "858", who: "Facility Specialist" },
    { num: "859", who: "Aquatics (1 and 2)" },
    { num: "860", who: "Cleaner Assistant" },
    { num: "861", who: "Weight Room Assistant" },
    { num: "862", who: "Court Assistant" },
    { num: "864", who: "Adventure Center" },
    { num: "865", who: "Dr. Chris Baker" },
    { num: "866", who: "Facility Supervisor" },
    { num: "867", who: "Chris Lukas" }
  ],

  /* Urgency phrases */
  urgency: [
    {
      phrase: "Immediately",
      means: "Medical emergency",
      examples: "Broken bone all the way down to a paper cut",
      pause: false,
      pauseNote: "No pause after radioing 866 - keep talking."
    },
    {
      phrase: "As soon as possible",
      means: "Urgent situation",
      examples: "Angry patrons, thefts",
      pause: false,
      pauseNote: "No pause after radioing 866 - keep talking."
    },
    {
      phrase: "When you get the chance",
      means: "Non-urgent, and everything else",
      examples: "Breaks, battery replacement, general questions",
      pause: true,
      pauseNote: "PAUSE and wait for \"66 go ahead\" before you continue."
    },
    {
      phrase: "All available staff",
      means: "Fights",
      examples: "Call it to your specific location. Weight Room cannot leave post.",
      pause: false,
      pauseNote: "No pause. Respond only if your position allows it."
    }
  ],

  /* Arrival times by DSE posted shift */
  arrivals: [
    { dse: "5:15am - 9am", arrive: "5:15am", clockIn: "5:20am", station: "5:25am" },
    { dse: "9am - 12pm", arrive: "8:45am", clockIn: "8:50am", station: "8:55am" },
    { dse: "12pm - 3/4pm", arrive: "11:45am", clockIn: "11:50am", station: "11:55am" },
    { dse: "3pm - 7pm", arrive: "2:45pm", clockIn: "2:50pm", station: "2:55pm" },
    { dse: "7pm - 10pm", arrive: "6:45pm", clockIn: "6:50pm", station: "6:55pm" }
  ],

  openingTimes: "Openers arrive at the DSE time itself: 5:15am Mon-Fri, 6:45am Sat, 7:45am Sun.",
  welcomeDeskPhone: "330-672-0482",

  /* Locker room uniform builder.
     ok:true passes normally. friday:true passes only on Blue and Gold Fridays. */
  uniform: [
    { id: "khaki", slot: "bottoms", label: "Fingertip-length khaki shorts", icon: "🩳", ok: true,
      why: "Khaki bottoms at fingertip length or longer. Perfect." },
    { id: "jeans", slot: "bottoms", label: "Full-length jeans", icon: "👖", ok: true,
      why: "Jeans are allowed as long as they are fingertip-length or longer." },
    { id: "white", slot: "bottoms", label: "White athletic pants", icon: "🥼", ok: false,
      why: "No white or multi-colored pants." },
    { id: "tiedye", slot: "bottoms", label: "Multi-colored joggers", icon: "🌈", ok: false,
      why: "No white or multi-colored pants." },
    { id: "shortsh", slot: "bottoms", label: "Shorts above fingertip length", icon: "🩱", ok: false,
      why: "Bottoms must reach fingertip length or longer." },
    { id: "deptshirt", slot: "top", label: "Department shirt for your position", icon: "👕", ok: true,
      why: "Department shirt that matches your position. Correct." },
    { id: "ksblue", slot: "top", label: "Kent State blue and gold tshirt", icon: "💙", ok: false, friday: true,
      why: "Kent State apparel is Blue and Gold Friday only." },
    { id: "cardigan", slot: "top", label: "Cardigan over your shirt", icon: "🧥", ok: false,
      why: "No sweaters, cardigans or cover-ups." },
    { id: "randomtee", slot: "top", label: "Neon graphic tshirt", icon: "🎨", ok: false,
      why: "Your shirt has to be the department shirt for your position." },
    { id: "nametag", slot: "badge", label: "Nametag", icon: "📛", ok: true,
      why: "Nametag is required every shift." },
    { id: "nonametag", slot: "badge", label: "Skip the nametag today", icon: "🚫", ok: false,
      why: "The nametag is part of the uniform. No exceptions." },
    { id: "sneakers", slot: "shoes", label: "Tennis / athletic shoes", icon: "👟", ok: true,
      why: "Tennis or athletic shoes only." },
    { id: "boots", slot: "shoes", label: "Work boots", icon: "🥾", ok: false,
      why: "No boots, sandals or open-toed shoes." },
    { id: "sandals", slot: "shoes", label: "Slides", icon: "🩴", ok: false,
      why: "No boots, sandals or open-toed shoes." },
    { id: "longsleeve", slot: "layer", label: "Navy long-sleeve UNDER uniform", icon: "🧣", ok: true,
      why: "Grey, white or navy long-sleeves may be worn under the uniform." },
    { id: "hoodie", slot: "layer", label: "Hoodie over uniform", icon: "🧥", ok: false,
      why: "No cover-ups over the uniform." },
    { id: "nolayer", slot: "layer", label: "No extra layer", icon: "✅", ok: true,
      why: "A layer is optional. No layer is always fine." }
  ],

  /* Radio drills for the Radio Check round */
  radioDrills: [
    {
      text: "A patron on Court 2 goes down holding their ankle and cannot stand up.",
      to: "866", phrase: "Immediately", pause: false,
      body: "could you come down to Court 2"
    },
    {
      text: "Your radio battery is dying and you want a replacement.",
      to: "866", phrase: "When you get the chance", pause: true,
      body: "could you come down to my area"
    },
    {
      text: "A patron is yelling at the Welcome Desk staff and refusing to leave.",
      to: "866", phrase: "As soon as possible", pause: false,
      body: "could you come to the Welcome Desk"
    },
    {
      text: "Two patrons start swinging at each other on Court 1.",
      to: "all available staff", phrase: "All available staff", pause: false,
      body: "can you come to Court 1"
    },
    {
      text: "You are due for your break and the floor is quiet.",
      to: "866", phrase: "When you get the chance", pause: true,
      body: "could you cover me for my break"
    },
    {
      text: "A patron sliced their hand open on a piece of equipment. It is bleeding.",
      to: "866", phrase: "Immediately", pause: false,
      body: "could you come to the weight room"
    },
    {
      text: "You found an unused SRWC basketball on the court floor and need it back in circulation.",
      to: "855", phrase: "When you get the chance", pause: true,
      body: "could you come to the railing"
    },
    {
      text: "Someone reports their phone was stolen out of a cubby.",
      to: "866", phrase: "As soon as possible", pause: false,
      body: "could you come to the lower fitness floor"
    }
  ],

  /* Badges awarded on the end-of-shift report */
  badges: [
    { id: "dressed", name: "Uniform Ready", icon: "👔", desc: "Clocked in with a flawless uniform." },
    { id: "ontime", name: "On the 55", icon: "⏰", desc: "Nailed the timeliness round." },
    { id: "radio", name: "Radio Voice", icon: "📻", desc: "Perfect radio call: right number, right phrase, right pause." },
    { id: "streak5", name: "Hot Streak", icon: "🔥", desc: "5 correct calls in a row on the floor." },
    { id: "noflag", name: "Clean Shift", icon: "✨", desc: "Finished the floor with confidence never dropping below 70%." },
    { id: "closer", name: "Closer", icon: "🔑", desc: "Perfect closing checklist." },
    { id: "solo", name: "Cleared for Solo", icon: "🎖️", desc: "Scored 85% or better across the whole shift." }
  ],

  /* ==========================================================
     SHARED SCENARIOS
     Facility-wide policies. Any position can be asked these.
     ========================================================== */
  shared: {
    scenarios: [
      {
        id: "an1", zone: "Upper Fit", tag: "Patron Dress",
        text: "A patron is on the fitness floor in jeans with metal rivets and an exposed zipper.",
        options: [
          { t: "\"I'm sorry to interrupt your workout, are you aware of our dress code policy? We don't allow jeans with rivets. Do you have something you can change into?\"", correct: true },
          { t: "Tell them to leave the facility.", correct: false },
          { t: "Ignore it, jeans are not dangerous.", correct: false },
          { t: "Radio 866 immediately.", correct: false }
        ],
        teach: "Jeans, khakis and anything with belts, studs, rivets or exposed zippers can tear the vinyl on equipment, leading to health risks and costly replacements. Use the script, and if they push back at all, radio your supervisor or specialist as soon as possible."
      },

      {
        id: "an2", zone: "Lower Fit", tag: "Patron Dress",
        text: "Someone is working out in backless slip-on sneakers.",
        options: [
          { t: "Fine, they are athletic shoes.", correct: false },
          { t: "Not permitted. Athletic shoes need a full back and closed toe everywhere except the locker room and pool.", correct: true },
          { t: "Only an issue in the free-weight area.", correct: false },
          { t: "Allowed if they are careful.", correct: false }
        ],
        teach: "Backless or partially backed shoes are not permitted because they easily slip off and fail to provide full foot protection. Athletic, non-marking shoes with a full back and closed toe are required in all areas except the locker room and pool."
      },

      {
        id: "an3", zone: "Circuit", tag: "Food and Drink",
        text: "A patron is eating a protein bar between sets with an open cup of coffee on the machine.",
        options: [
          { t: "\"I'm sorry to interrupt you, but are you aware of our food and drink policies? Would you mind taking that up to the mall area to eat? Thanks.\"", correct: true },
          { t: "Only the coffee is a problem.", correct: false },
          { t: "Let them finish, then mention it.", correct: false },
          { t: "Confiscate the food.", correct: false }
        ],
        teach: "Food and beverages may be consumed in the mall area only. Drinks in a container with a lid are permitted throughout the facility. Food is a choking hazard, a mess and an allergy risk. Gum is prohibited beyond the Welcome Desk."
      },

      {
        id: "an4", zone: "Facility", tag: "Tobacco",
        text: "You catch the smell of a vape near the track and see someone tucking a device away.",
        options: [
          { t: "All smoking, including e-cigarettes, vaporizers and mod boxes, is prohibited on any Kent State property. Address it and involve your sup if they push back.", correct: true },
          { t: "Only cigarettes are banned, vapes are fine indoors.", correct: false },
          { t: "Ask them to step outside to vape.", correct: false },
          { t: "Ignore it, you did not actually see it.", correct: false }
        ],
        teach: "Smoking and tobacco use is not allowed on any property owned, operated or leased by Kent State, including personal vehicles parked on university property. That covers cigarettes, cigars, cigarillos, cloves, hookahs, e-cigarettes, herbal and oil vaporizers, pipes, water pipes, all smokeless tobacco and all non-FDA-approved nicotine products."
      },

      {
        id: "an5", zone: "Lower Fit", tag: "Age Policy",
        text: "An 11-year-old is walking the fitness floor while their parent runs on the track upstairs.",
        options: [
          { t: "Ages 12 and under are not allowed on the fitness floors at all, and need a parent or guardian in the same room.", correct: true },
          { t: "Fine as long as the parent is in the building.", correct: false },
          { t: "Fine if they have done Teen User Orientation.", correct: false },
          { t: "Fine as long as they stay off the machines.", correct: false }
        ],
        teach: "Ages 12 and under: parent or guardian in the SAME ROOM, and never on the Fitness Floors. Ages 13-15: guardian in the building, and Teen User Orientation required to use machines but not free weights. That orientation is scheduled with Beth, Assistant Director of Fitness and Wellness. Ages 16-18: no supervision needed."
      },

      {
        id: "an6", zone: "Upper Fit", tag: "Photo and Video",
        text: "Someone is filming their squat set with a phone tripod on the fitness floor.",
        options: [
          { t: "Use the script: introduce yourself, explain patrons cannot take photos or video in fitness spaces or locker rooms, for the privacy of other patrons.", correct: true },
          { t: "Fine as long as nobody else is in frame.", correct: false },
          { t: "Only prohibited in the pool and locker rooms.", correct: false },
          { t: "Tell them to get approval from the Welcome Desk right now.", correct: false }
        ],
        teach: "Photos and video are strictly prohibited in the pool, locker rooms and restrooms, and all other filming in the SRWC and Ice Arena must be directed to Dr. Chris Baker, Senior Associate Director. Approved individuals pick up a media pass at the Member Services Desk and return it when filming is complete."
      },

      {
        id: "an7", zone: "Facility", tag: "Locker Rooms",
        text: "A patron tells you they are uncomfortable using either the men's or women's locker room.",
        options: [
          { t: "Let them know about the two Universal Locker Rooms near the pool: single shower stalls, day-use lockers, toilets, first come first served.", correct: true },
          { t: "Tell them to use the one matching their ID.", correct: false },
          { t: "Tell them to change at home.", correct: false },
          { t: "Radio 866 immediately.", correct: false }
        ],
        teach: "Recreation and Wellness Services follows the Kent State non-discrimination policy, which includes gender identity as a protected class. All students and patrons retain the right to privacy and to physical and emotional safety. Anyone not comfortable is encouraged to use one of the two Universal Locker Rooms near the pool, open during regular business hours."
      },

      {
        id: "an8", zone: "Locker Room", tag: "Day-Use Lockers",
        text: "You are closing and find a personal lock still on a day-use locker.",
        options: [
          { t: "Locks left overnight get cut off and the contents removed, so flag it for your supervisor.", correct: true },
          { t: "Leave it, the patron will be back tomorrow.", correct: false },
          { t: "Cut it yourself and take the contents home for safekeeping.", correct: false },
          { t: "Tape a note on it and leave it a week.", correct: false }
        ],
        teach: "Members are strongly encouraged to lock day-use lockers, but locks left on overnight will be cut off and contents removed. Recreation and Wellness Services is not responsible for lost or stolen items."
      },

      {
        id: "an9", zone: "Facility", tag: "Tornado",
        text: "A tornado warning is issued while the facility is full.",
        options: [
          { t: "Calmly tell patrons, recommend they shelter in the locker rooms, avoid elevators and windows, and stay in contact with the sup.", correct: true },
          { t: "Evacuate everyone out of the building immediately.", correct: false },
          { t: "Send everyone to the courts, the ceilings are high.", correct: false },
          { t: "Use the elevators to move people downstairs quickly.", correct: false }
        ],
        teach: "Tornado warning: seek designated shelter immediately, avoid elevators, stay away from windows. Patrons are not required to leave the facility, but staff should recommend they shelter in the locker rooms, the designated shelter areas. Stay in communication with the supervisor on shift for updates."
      },

      {
        id: "an10", zone: "Facility", tag: "Med Bag",
        text: "You are grabbing the med bag on the way to an immediate call. Which color has the gloves?",
        options: [
          { t: "Blue bag: small, medium, large and extra-large gloves.", correct: true },
          { t: "Red bag.", correct: false },
          { t: "Yellow bag.", correct: false },
          { t: "Green bag.", correct: false }
        ],
        teach: "Red is gauze pads and band-aids (large, knuckle, butterfly) and roller gauze. Yellow is glucose tablets, aspirin, tongue depressors, tweezers, antiseptic and alcohol wipes, sting relief, steri-strips, scissors, shock blanket, tooth saver and eyewash. Green is cloth tape, 4 triangle bandages and a small SAM splint. Blue is gloves. Med Bags AND AEDs go to every immediate call."
      },

      {
        id: "an11", zone: "Facility", tag: "EAP",
        text: "You reach an unconscious patron. Nobody is around to give consent.",
        options: [
          { t: "Consent is implied when a patron is unconscious, so glove up and provide care while radioing 66 and 58 immediately.", correct: true },
          { t: "Wait until someone who knows them can consent.", correct: false },
          { t: "You cannot touch them without permission.", correct: false },
          { t: "Find the sup first, then start care.", correct: false }
        ],
        teach: "Consent rules: no means no, consent is IMPLIED when the patron is unconscious, and minors need consent from their parents. Always put gloves on (PPE) before touching a patron."
      },

      {
        id: "an12", zone: "Welcome Desk", tag: "Alarms",
        text: "A help alarm goes off in a restroom and shows red on the WinPak system.",
        options: [
          { t: "The Guest Services Assistant or Specialist radios the Supervisor with the exact location, and the sup responds to assess.", correct: true },
          { t: "Whoever is closest silences the alarm.", correct: false },
          { t: "Announce it over the PA.", correct: false },
          { t: "Wait to see if it is a false alarm.", correct: false }
        ],
        teach: "Help alarms sit in restrooms, locker rooms and other high-risk locations. Door alarms trigger when a restricted, emergency or exit-only door is opened without authorization. Both send a signal to the WinPak system at the Welcome Desk, appearing in red. The GSA or Specialist immediately radios the Supervisor the exact location."
      },

      {
        id: "an13", zone: "Home", tag: "Shift Coverage",
        text: "You just realized you cannot make a shift that is 5 days out.",
        options: [
          { t: "Post it on the DSE trade board, ask in the Operations GroupMe, message staff individually through DSE, and reach out to the GA and Dr. Baker since it is more than 48 hours out.", correct: true },
          { t: "Text the supervisor on shift and call it handled.", correct: false },
          { t: "Just do not show up, someone will cover.", correct: false },
          { t: "Only post it on the trade board and hope.", correct: false }
        ],
        teach: "Post your shift on the DSE trade board, text the Operations GroupMe, and message staff individually through DSE. More than 48 hours before the shift, reach out to the Graduate Assistant and Dr. Baker. Within 48 hours, reach out to the supervisor. Check DSE often: wild card shifts get assigned to you, and not knowing you were scheduled is NOT an excuse to miss a shift."
      },

      {
        id: "an14", zone: "Home", tag: "Timeliness",
        text: "You are running late for a 3pm-7pm shift and you are stuck in traffic.",
        options: [
          { t: "Call the Welcome Desk at 330-672-0482 and/or the sup on shift right away with the time you will actually arrive.", correct: true },
          { t: "Text a coworker to let the sup know.", correct: false },
          { t: "Just get there as fast as you can and explain after.", correct: false },
          { t: "Clock in from your phone so it does not count as late.", correct: false }
        ],
        teach: "For a 3pm-7pm DSE shift: arrive 2:45, clock in 2:50, at station 2:55. If you are late, let the supervisor know ASAP by calling the Welcome Desk (330-672-0482) or the sup on shift, and tell them what time you will be there. Do not arrive late and use traffic as an excuse, plan to be on time."
      },

      {
        id: "an15", zone: "Facility", tag: "Timeliness",
        text: "Your DSE shift starts at 9am. You walk in at 8:47 and reach for the clock-in at 8:48.",
        options: [
          { t: "8:48 is past the \"42\" mark, so clock in and be at your station by 8:55.", correct: true },
          { t: "You are late, you should have been in the building at 8:30.", correct: false },
          { t: "You can clock in at any time once you arrive.", correct: false },
          { t: "You have until 9:00 to reach your station.", correct: false }
        ],
        teach: "Be in the building 15 minutes before your DSE shift. Do not clock in before the \"42\" minute mark. You receive a negative write-up if you are not IN POSITION by the \"55\" minute mark. For a 9am shift: arrive 8:45, clock in 8:50, at station 8:55."
      },

      {
        id: "an16", zone: "Facility", tag: "Mocks and Audits",
        text: "Mid-shift your supervisor asks you to walk through what you would do for a suspected cardiac arrest on Court 1.",
        options: [
          { t: "Treat it like a real emergency, stay calm, walk the steps of care, and take the feedback as a learning opportunity.", correct: true },
          { t: "Tell them you are busy and can do it later.", correct: false },
          { t: "Give a rough answer since it is only a drill.", correct: false },
          { t: "Ask a coworker to answer for you.", correct: false }
        ],
        teach: "On-shift mocks and audits build real First Aid, CPR and AED readiness. Be prepared and know where emergency equipment is. Stay calm and treat each mock as a genuine emergency. Learn from mistakes and seek clarification from ERT. Feedback is provided right away."
      }
    ]
  },

  /* ==========================================================
     POSITIONS
     One self-contained block each. Copy a block to add a new one.
     ========================================================== */
  positions: {

    /* ---------- 60  Cleaner Assistant ---------- */
    "60": {
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
          { t: "Use patron towels to wipe down machines", ok: false,
            why: "Never use patron towels or microfibers meant for patrons to clean the machines." },
          { t: "Drop cleaning rags in the patron towel bin", ok: false,
            why: "Cleaning rags go in the white bin behind the FitWell desk." }
        ]
      }
    },

    /* ---------- 61  Weight Room Assistant ---------- */
    "61": {
      num: "61",
      name: "Weight Room Assistant",
      icon: "🏋️",
      blurb: "Lower free-weight floor and lower fitness. Stay active, stay alert, stay present.",

      /* Scenarios only this position is asked */
      scenarios: [
        {
          id: "wr1", zone: "Weight Room", tag: "Policy",
          text: "A 14-year-old walks onto the lower free-weight floor with a parent waiting in the lobby.",
          options: [
            { t: "Let them lift, the parent is in the building.", correct: false },
            { t: "Politely tell them the free-weight area is 16+, and point them to the cardio and circuit areas they can use.", correct: true },
            { t: "Radio 866 immediately and clear the room.", correct: false },
            { t: "Ask them to finish their set and then leave.", correct: false }
          ],
          teach: "Patrons must be 16 or older for the Weight Room (lower free-weight area). Ages 13-15 may use upper fitness, circuit and cardio after New User Orientation."
        },

        {
          id: "wr2", zone: "Weight Room", tag: "Re-Rack",
          text: "It is 40 minutes into your hour. Plates are scattered on the floor and two are leaning on a mirror.",
          options: [
            { t: "Leave it for the closing shift.", correct: false },
            { t: "Re-rack now. Weights never lean on walls, columns, equipment or mirrors, and re-racking happens every hour.", correct: true },
            { t: "Radio 60 to come clean it up.", correct: false },
            { t: "Stack them neatly against the column instead.", correct: false }
          ],
          teach: "Re-rack every hour during your rotation. No plates on the floor, leaning on walls or mirrors, or in the wrong home. Failure to maintain this creates safety hazards."
        },

        {
          id: "wr3", zone: "Weight Room", tag: "Presence",
          text: "The room is quiet. You find a comfortable spot along the back wall to watch from.",
          options: [
            { t: "Fine, you can see the whole room from there.", correct: false },
            { t: "Get off the wall and make rounds. Staff should never be seen standing against a wall.", correct: true },
            { t: "Sit on an unused bench instead.", correct: false },
            { t: "Scroll your phone since nobody needs help.", correct: false }
          ],
          teach: "Stay active, stay alerted, stay present. Standing against walls creates safety hazards and reads as a lack of supervision. Make your rounds and find the simple task."
        },

        {
          id: "wr4", zone: "Weight Room", tag: "Safety",
          text: "A patron loads a bar with no clips and starts a heavy bench press, dropping the bar loudly at the end of each set.",
          options: [
            { t: "Say nothing, they look experienced.", correct: false },
            { t: "Intervene early (Or wait till they are done with one set): ask them to stop, explain clips are always required and that dropping or slamming weights is prohibited.", correct: true },
            { t: "Wait until they finish their whole workout, then mention it.", correct: false },
            { t: "Radio all available staff.", correct: false }
          ],
          teach: "Intervene early. The use of clips is always required, and slamming or dropping weights is prohibited. Correct unsafe behavior when you see it, not after."
        },

        {
          id: "wr5", zone: "Weight Room", tag: "Equipment",
          text: "A cable machine attachment snapped mid-set. Nobody is hurt.",
          options: [
            { t: "Radio 866 \"when you get the chance\" so the sup can file a Fitness Request Form, and tell patrons the machine is down.", correct: true },
            { t: "Radio 866 \"immediately\", broken equipment is an emergency.", correct: false },
            { t: "Fill out the Fitness Request Form yourself on the iPad.", correct: false },
            { t: "Put the broken piece back on and let people keep using it.", correct: false }
          ],
          teach: "Broken machine means radio your sup when you get the chance. The SUPERVISOR fills the Fitness Request Form, posts the out-of-order sign and boxes broken parts behind the FitWell desk. You tell patrons it is being checked out."
        },

        {
          id: "wr6", zone: "Weight Room", tag: "Solo Opening",
          text: "You are the only Recreation Assistant scheduled on an opening shift.",
          options: [
            { t: "Rotate 61 to 60 to 62 every hour like normal.", correct: false },
            { t: "Stay in the Weight Room the whole shift, staying mobile between it and the lower fitness area by the treadmills.", correct: true },
            { t: "Ask the supervisor which court to cover.", correct: false },
            { t: "Split your time between courts and weight room.", correct: false }
          ],
          teach: "One assistant scheduled means Weight Room for the entire shift. Stay mobile in the weight room AND lower fitness area, clean machines, benches and metal surfaces, align treadmills to the blue tape, and check last night's weights and cable attachments."
        },

        {
          id: "wr7", zone: "Weight Room", tag: "Policy",
          text: "A patron chalks up from a bag of loose powdered chalk before deadlifting.",
          options: [
            { t: "Allowed, chalk is standard for lifting.", correct: false },
            { t: "Powdered chalk is prohibited. Liquid chalk is the permitted option.", correct: true },
            { t: "Allowed if they clean up after.", correct: false },
            { t: "Only allowed in the free-weight area.", correct: false }
          ],
          teach: "The use of powdered chalk is prohibited. However, liquid chalk is permitted."
        },

        {
          id: "wr8", zone: "Weight Room", tag: "Policy",
          text: "Someone sets a Bluetooth speaker on a bench and starts playing music for the room.",
          options: [
            { t: "Leave it if nobody complains.", correct: false },
            { t: "Personal speakers are not permitted in workout spaces. Politely ask them to use headphones.", correct: true },
            { t: "Ask them to turn it down a bit.", correct: false },
            { t: "Radio 866 immediately.", correct: false }
          ],
          teach: "Personal speakers are not permitted in group exercise and workout spaces."
        },

        {
          id: "wr9", zone: "Weight Room", tag: "Emergency",
          text: "A patron on the platform grabs their shoulder mid-lift and says something popped. They are conscious and talking.",
          options: [
            { t: "Introduce yourself, get consent to help, gather SAMPLE, then radio 66 and 58 immediately.", correct: true },
            { t: "Radio 66 \"as soon as possible\" and wait by the desk.", correct: false },
            { t: "Help them out to their car.", correct: false },
            { t: "Start treating them right away, seconds matter.", correct: false }
          ],
          teach: "EAP first aid role: introduce yourself as a first aid and CPR certified ops assistant, ASK PERMISSION to help and to touch, collect SAMPLE, radio 66 and 58 immediately, get them comfortable and monitor until help arrives. No means no. Gloves on before contact."
        },

        {
          id: "wr10", zone: "Weight Room", tag: "Coverage",
          text: "You need the restroom and there is no other ops staff in the weight room.",
          options: [
            { t: "Go quickly, you will only be a minute.", correct: false },
            { t: "Radio 866 \"when you get the chance\" and wait for Ops coverage before leaving.", correct: true },
            { t: "Ask a regular patron to keep an eye on things.", correct: false },
            { t: "Prop the door and watch from the hallway.", correct: false }
          ],
          teach: "You CANNOT leave the area without supervision from Ops staff. A break is a non-urgent call: \"61 to 66?\" then PAUSE and wait for the response."
        }
      ],

      /* Closing checklist for this position.
         ok:false items are traps and should carry a "why". */
      closing: {
        title: "Weight Room Closing",
        items: [
          { t: "Re-rack every plate, dumbbell and attachment to its home", ok: true },
          { t: "Make sure no weights lean on walls, columns or mirrors", ok: true },
          { t: "Close and shut the windows once patrons have left", ok: true },
          { t: "Politely remind patrons who leave weights out to re-rack them", ok: true },
          { t: "Let cleanliness slide during the shift and fix it all at the end", ok: false,
            why: "Weight room organization and cleanliness should be maintained consistently throughout your entire shift." }
        ]
      }
    },

    /* ---------- 62  Court Assistant ---------- */
    "62": {
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
          { t: "Head out once the courts are clean", ok: false,
            why: "Notify your supervisor first. They may direct you to locker room checks or other closing responsibilities." },
          { t: "Leave lost items on the bleachers so patrons can find them", ok: false,
            why: "Lost and found goes to the Sup Bowl, in the white bin above Safe 2." }
        ]
      }
    }
  }
};
