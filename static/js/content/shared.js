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
      examples: "Breaks, radio replacement, general questions",
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
    {
      id: "khaki", slot: "bottoms", label: "Fingertip-length khaki shorts", icon: "🩳", ok: true,
      why: "Khaki bottoms at fingertip length or longer. Perfect."
    },
    {
      id: "jeans", slot: "bottoms", label: "Full-length jeans", icon: "👖", ok: true,
      why: "Jeans are allowed as long as they are fingertip-length or longer."
    },
    {
      id: "white", slot: "bottoms", label: "White athletic pants", icon: "🥼", ok: false,
      why: "No white or multi-colored pants."
    },
    {
      id: "tiedye", slot: "bottoms", label: "Multi-colored joggers", icon: "🌈", ok: false,
      why: "No white or multi-colored pants."
    },
    {
      id: "shortsh", slot: "bottoms", label: "Shorts above fingertip length", icon: "🩱", ok: false,
      why: "Bottoms must reach fingertip length or longer."
    },
    {
      id: "deptshirt", slot: "top", label: "Department shirt for your position", icon: "👕", ok: true,
      why: "Department shirt that matches your position. Correct."
    },
    {
      id: "ksblue", slot: "top", label: "Kent State blue and gold tshirt", icon: "💙", ok: false, friday: true,
      why: "Kent State apparel is Blue and Gold Friday only."
    },
    {
      id: "cardigan", slot: "top", label: "Cardigan over your shirt", icon: "🧥", ok: false,
      why: "No sweaters, cardigans or cover-ups."
    },
    {
      id: "randomtee", slot: "top", label: "Neon graphic tshirt", icon: "🎨", ok: false,
      why: "Your shirt has to be the department shirt for your position."
    },
    {
      id: "nametag", slot: "badge", label: "Nametag", icon: "📛", ok: true,
      why: "Nametag is required every shift."
    },
    {
      id: "nonametag", slot: "badge", label: "Skip the nametag today", icon: "🚫", ok: false,
      why: "The nametag is part of the uniform. No exceptions."
    },
    {
      id: "sneakers", slot: "shoes", label: "Tennis / athletic shoes", icon: "👟", ok: true,
      why: "Tennis or athletic shoes only."
    },
    {
      id: "boots", slot: "shoes", label: "Work boots", icon: "🥾", ok: false,
      why: "No boots, sandals or open-toed shoes."
    },
    {
      id: "sandals", slot: "shoes", label: "Slides", icon: "🩴", ok: false,
      why: "No boots, sandals or open-toed shoes."
    },
    {
      id: "longsleeve", slot: "layer", label: "Navy long-sleeve UNDER uniform", icon: "🧣", ok: true,
      why: "Grey, white or navy long-sleeves may be worn under the uniform."
    },
    {
      id: "hoodie", slot: "layer", label: "Hoodie over uniform", icon: "🧥", ok: false,
      why: "No cover-ups over the uniform."
    },
    {
      id: "nolayer", slot: "layer", label: "No extra layer", icon: "✅", ok: true,
      why: "A layer is optional. No layer is always fine."
    }
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

  /* ==========================================================
     POSITIONS
     Filled in by the per-position files loaded after this one,
     each in its own file in this folder:
       content/55-guest-services.js
       content/60-cleaner.js
       content/61-weight-room.js
       content/62-courts.js
     ========================================================== */
  positions: {}
};
