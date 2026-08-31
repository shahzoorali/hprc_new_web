import { parseResultsCsv } from "../src/endpoints/import-results";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name} ${extra}`); }
}

console.log("Header aliases + basic parse");
let r = parseResultsCsv(`Place,Rider Name,Horse,Club,Age Group,Percentage
1st,Gautam Sanjay Sujanaani,Airstrike,HPRC,14-18 yrs,66.12
2nd,"Reddy, Kumbham",Centaur,HPRC,14-18 yrs,53.75`);
check("2 entries", r.entries.length === 2, JSON.stringify(r.warnings));
check("pos alias 'Place'", r.entries[0].pos === "1st");
check("rider alias 'Rider Name'", r.entries[0].rider === "Gautam Sanjay Sujanaani");
check("quoted comma preserved", r.entries[1].rider === "Reddy, Kumbham", r.entries[1]?.rider);
check("score 66.12 -> 0.6612", r.entries[0].score === "0.6612", r.entries[0]?.score);

console.log("\nPercent sign and already-decimal scores");
r = parseResultsCsv(`rider,horse,score
A,B,66.12%
C,D,0.6612`);
check("'66.12%' -> 0.6612", r.entries[0].score === "0.6612", r.entries[0]?.score);
check("0.6612 left alone", r.entries[1].score === "0.6612", r.entries[1]?.score);

console.log("\nPenalties + judged-only classes");
r = parseResultsCsv(`pos,rider,horse,faults
1st,A,B,0
2nd,C,D,4`);
check("faults -> penalties", r.entries[1].penalties === "4", r.entries[1]?.penalties);

console.log("\nValidation");
r = parseResultsCsv(`rider,club\nA,HPRC`);
check("missing horse column rejected", r.entries.length === 0 && r.warnings.length > 0);
r = parseResultsCsv(`rider,horse\n,Airstrike\nReal,Horse`);
check("row missing rider skipped", r.entries.length === 1 && r.warnings.some(w => w.includes("Row 2")), JSON.stringify(r.warnings));

console.log("\nUnknown columns reported, not silently dropped");
r = parseResultsCsv(`rider,horse,mystery\nA,B,x`);
check("unknown column listed as ignored", r.ignored.includes("mystery"), JSON.stringify(r.ignored));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
