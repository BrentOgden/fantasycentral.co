// src/components/OlympicMedalResultsModal.jsx
import React, { useMemo, useState } from "react";

/**
 * OlympicMedalResultsModal
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - results: Array<{
 *     name: string
 *     gold: number
 *     silver: number
 *     bronze: number
 *     totalMedals: number
 *     submittedAt?: string | Date
 *   }>
 */
export default function OlympicMedalResultsModal({
  isOpen,
  onClose,
  results = [],
}) {
  const [sort, setSort] = useState({ key: "gold", dir: "desc" });

  const sortedResults = useMemo(() => {
    const copy = [...results];
    const { key, dir } = sort;

    copy.sort((a, b) => {
      const av = a[key];
      const bv = b[key];

      if (typeof av === "number" && typeof bv === "number") {
        return dir === "asc" ? av - bv : bv - av;
      }

      const as = String(av ?? "").toLowerCase();
      const bs = String(bv ?? "").toLowerCase();
      return dir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });

    return copy;
  }, [results, sort]);

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 p-6 relative shadow-2xl text-slate-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white text-gray-700 hover:border-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
          Olympic Draft Order Guesses
        </h2>

        <div className="overflow-auto rounded-xl border">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-center">
              <tr>
                <Th label="#" />
                <Th label="Name" onClick={() => toggleSort("name")} sort={sort} col="name" />
                <Th label="Gold" onClick={() => toggleSort("gold")} sort={sort} col="gold" />
                <Th label="Silver" onClick={() => toggleSort("silver")} sort={sort} col="silver" />
                <Th label="Bronze" onClick={() => toggleSort("bronze")} sort={sort} col="bronze" />
                <Th label="Total" onClick={() => toggleSort("totalMedals")} sort={sort} col="totalMedals" />
              </tr>
            </thead>

            <tbody>
              {sortedResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-500">
                    No results entered yet.
                  </td>
                </tr>
              ) : (
                sortedResults.map((r, i) => (
                  <tr
                    key={`${r.name}-${i}`}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                  >
                    <td className="p-3 border-t text-slate-500">{i + 1}</td>
                    <td className="p-3 border-t font-medium text-slate-800">
                      {r.name}
                    </td>
                    <td className="p-3 border-t">{r.gold}</td>
                    <td className="p-3 border-t">{r.silver}</td>
                    <td className="p-3 border-t">{r.bronze}</td>
                    <td className="p-3 border-t font-semibold">
                      {r.totalMedals}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Th({ label, onClick, sort, col }) {
  const active = sort?.key === col;
  return (
    <th
      onClick={onClick}
      className={`p-3 text-center text-xs uppercase tracking-wide font-semibold cursor-pointer select-none
        ${onClick ? "hover:bg-slate-100" : ""}
      `}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {onClick && (
          <span className={`text-[10px] ${active ? "opacity-100" : "opacity-30"}`}>
            {active ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
          </span>
        )}
      </span>
    </th>
  );
}
