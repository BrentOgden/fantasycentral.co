import "../customCss/Payout.css";
import React from "react";
import { FaFootball } from "react-icons/fa6";

function Payout(props) {
  return (
    <section className="content-icons bg-gradient-to-br from-red-900 via-black to-red-700 shadow-slate-500 mt-4 mx-5 md:mx-0 shadow-2xl rounded-2xl">
      <div className="grid grid-cols-2 divide-x pt-4 mt-4 mr-6">
        <div className="align-middle text-center">
          <h3 className="font-bold text-lg">2026 Redraft Updates</h3>

          <div>
            <p className="text-center p-3 text-white">
              <span className="font-bold uppercase animate-pulse">
                **There are new rules in effect this season**
              </span>
            </p>

            <ul className="grid grid-cols-1 px-4 text-left text-whiteleading-normal">
              <li className="flex items-start gap-2">
                <FaFootball className="mt-1 shrink-0" aria-hidden="true" />
                <span>IR Spots have been reduced from 2 to 1</span>
              </li>

              <li className="flex items-start gap-2">
                <FaFootball className="mt-1 shrink-0" aria-hidden="true" />
                <span>Bench spots have been reduced from 7 to 6</span>
              </li>

              <li className="flex items-start gap-2">
                <FaFootball className="mt-1 shrink-0" aria-hidden="true" />
                <span>
                  Kickers have been removed. There will now be an additional
                  flex spot (TE/WR/RB)
                </span>
              </li>

              <li className="flex items-start gap-2">
                <FaFootball className="mt-1 shrink-0" aria-hidden="true" />
                <span>
                  Non-Playoff Teams will compete during the playoffs for the #1
                  pick next season. The{" "}
                  <span className="font-bold"> 1st round</span> of the 2027
                  draft will be determined the same as it is in Dynasty (order
                  for all remaining rounds will be in inverse order of final
                  2026 results)
                </span>
              </li>
            </ul>
            <p className="text-center p-3 text-white">
              Below are the payouts for the 2026 season. The entry fee will
              remain the same this season. The entry fee is{" "}
              <span className="font-bold">$230</span>. Reminder that all league
              dues must be paid prior to the start of the season (or partial
              payment must be made).
            </p>
          </div>

          <h3 className="font-bold">Redraft Payouts</h3>

          <p className="text-center p-3">
            1st Place - $1100<br></br>
            2nd Place - $600<br></br>
            3rd Place - $230<br></br>
            Weekly High Points - $45/week<br></br>
            Overall High Points - $70<br></br>
            Weekly Picks Champion - $50
          </p>
        </div>

        <div className="text-center px-6">
          <h3 className="font-bold text-lg">2026 Dynasty League Updates</h3>

          <p className="text-center p-3">
            Below are the payouts for this season in dynasty. The entry fee will
            remain <span className="font-bold">$160</span> for this season. The
            3 year progressive pot will continue in its 2nd season. Reminder
            that all league dues must be paid prior to the start of the season
            (or partial payment must be made).
          </p>

          <h3 className="font-bold">Dynasty Payouts</h3>

          <p className="text-center p-3">
            1st Place - $800<br></br>
            2nd Place - $490<br></br>
            3rd Place - $160<br></br>
            Progressive Pot - $240/year
          </p>
        </div>
      </div>
    </section>
  );
}

export default Payout;
