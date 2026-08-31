/* ============================================================
   POSITION 61  Weight Room Assistant
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
  throw new Error('content/shared.js must load before 61-weight-room.js - check the <script> order in index.html');
}

CONTENT.positions["61"] = {
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
      {
        t: "Let cleanliness slide during the shift and fix it all at the end", ok: false,
        why: "Weight room organization and cleanliness should be maintained consistently throughout your entire shift."
      }
    ]
  }
};
