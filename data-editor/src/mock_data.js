export const benzodiazepines = {
  "name": "BENZODIAZEPINES",
  "columns": [
    { key: 'name', name: "NAME", width: 200 },
    { key: "DOSE", name: "DOSE", width: 500 },
    { key: "ONSET/DURATION", name: "ONSET/DURATION", width: 500 },
    { key: "METABOLISM/EXCRETION", name: "METABOLISM/EXCRETION" },
    { key: "WARNINGS", name: "WARNINGS" }
  ],
  "drugs": [
    {
      "name": "ALPRAZOLAM",
      "_coordinate": "A2",
      "data": {
        "DOSE": {
          "Anxiety": "Initial: PO: 0.25 to 0.5 mg q8hr titrated q3-4d (max: 4 mg/d)\n",
          "Pre-operative anxiety": "PO: 0.5 mg 60 to 90 min pre-pocedure (1)\n",
          "Anxiety": ""
        },
        "ONSET/DURATION": {
          "Onset": "",
          "Half-life": "11.2 hr (6.3 to 26.9 hr); increased in alcoholic liver disease, obesity, and elderly\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": ""
        },
        "WARNINGS": {
          "Contraindications": "Acute narrow angle glaucoma\n",
          "Warnings": ""
        }
      }
    },
    {
      "name": "CHORDIAZEPOXIDE",
      "_coordinate": "A7",
      "data": {
        "DOSE": {
          "Anxiety": "Mild-moderate: 5 to 10 mg q6hr; severe: 20 to 25 mg q6hr; geriatric or delibitated: 5 mg q6-12hr\n",
          "Alcohol withdrawal syndrome": "PO: Initial: 50 to 100 mg; repeat prn (max: 300 mg/d); use lowest effective dose\n",
          "Panic disorder": ""
        },
        "ONSET/DURATION": {
          "Onset": "",
          "Half-life": "24 to 48 hr;  active metabolite: 14 to 95 hr (3)\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": ""
        },
        "WARNINGS": {
          "Warnings": "Dose-dependent respiratory depression especially when used concomitantly with CNS depressants\nPregnancy risk: 1st and 3rd trimesters\n",
          "Contraindications": ""
        }
      }
    },
    {
      "name": "CLONAZEPAM",
      "_coordinate": "A11",
      "data": {
        "DOSE": {
          "Panic disorder": "PO: Initial: 0.25 mg q12hr; titrate dose by 0.125 to 0.25 mg  q3d; target dose: 1 mg daily (max: 4 mg/d) \n",
          "Seizure disorder": "PO: Initial: Up to 0.5 mg q8h; titrate dose by 0.5 to 1 mg q3d (max: 20 mg/d)\n",
          "Agitation": ""
        },
        "ONSET/DURATION": {
          "Onset": "",
          "Half-life": "30 to 40 hr\n",
          "Duration": "Up to 12 hours\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": ""
        },
        "WARNINGS": {
          "Contraindications": "",
          "Warnings": "Dose-dependent respiratory depression especially when used concomitantly with CNS depressants\nPregnancy risk: Low\n"
        }
      }
    },
    {
      "name": "DIAZEPAM",
      "_coordinate": "A18",
      "data": {
        "DOSE": {
          "Agitation": "",
          "Anxiety": "PO: 2 to 10 mg q6-12hr prn\nIM, IV: 2 to 10 mg then q3-4h prn\n",
          "Muscle spasm": "PO: 2 to 10 mg q6-12hr prn\nIM, IV: 2 to 10 mg then q3-4h prn\n",
          "Seizures": "Adjunctive: PO: 2 to 10 mg q6-12hr prn; intermittent treatment: PR: rectal gel 0.2 mg/kg, repeat once in 4 to 12 hr prn\n",
          "Status epilepticus": "IV: 0.15 to 0.2 mg/kg (max: 10 mg), repeat in 5 min prn x 1 \nPR: 0.2 to 0.5 mg/kg (max: 20 mg)\n",
          "Alcohol withdrawal syndrome": "PO: 10 mg q6-8hr x 24h then reduce to 5mg \nIM, IV: initial: 10 mg; repeat 5 to 10 mg in 3 to 4 hr prn\n"
        },
        "ONSET/DURATION": {
          "Onset": "",
          "Half-life": "Parent: Up to 48 hr; metabolite: up to 100 hr\n",
          "Duration": "IV: 1 to 2 hr (children)\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": ""
        },
        "WARNINGS": {
          "Contraindications": "",
          "Warnings": "Dose-dependent respiratory depression especially when used concomitantly with CNS depressants\nPregnancy risk: 1st and 3rd trimesters\n"
        }
      }
    },
    {
      "name": "LORAZEPAM",
      "_coordinate": "A34",
      "data": {
        "DOSE": {
          "Agitation": "IV: Initial: 0.02 to 0.04 mg/kg (max: 2 mg); maintenance: 0.02 to 0.06 mg/kg q2-6hr prn or 0.01 to 0.1 mg/kg/hr (max: 10 mg/hr)\nAlternative: 1 to 3 mg q30-60min, consider with antispychotic\n",
          "Alcohol withdrawal syndrome": "PO, IM, IV: 2 to 4 mg q1h prn or 1 to 2 mg q6h\n",
          "Sedation (procedural)": ""
        },
        "ONSET/DURATION": {
          "Onset": "",
          "Half-life": "8 to 15 hr\n",
          "Duratation": "Anaesthesia: 6-8 hours\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": ""
        },
        "WARNINGS": {
          "Contraindications": "Olanzapine IM with IV lorazepam (cardiopulmonary depression)\nAcute narrow angle glaucoma\n",
          "Warnings": "Dose-dependent respiratory depression especially when used concomitantly with CNS depressants\nPropylene glycol toxicity (metabolic acidosis, AKI): total daily IV doses >/= 1 mg/kg\nPregnancy risk: 1st and 3rd trimesters\n",
          "Contrainidications": ""
        }
      }
    },
    {
      "name": "MIDAZOLAM",
      "_coordinate": "A42",
      "data": {
        "DOSE": {
          "Sedation (procedural)": "IV: Initial: 0.5 to 2 mg (titrate every 2-3 minutes if needed); usual total dose: 2.5 to 5mg\nIM: 0.07 to 0.08 mg/kg (30 to 60min pre-procedure); usual dose: 5mg, reduced dose in elderly (</=3 mg)\nIntranasal: 0.1 mg/kg 15min before procedure\n",
          "Sedation (mechanically-ventilated)": "IV: Initial: 0.01 to 0.05 mg/kg (q10-15 prn until goal sedation);\ninfusion: 0.02 to 0.1 mg/kg/hr, titrate to goal sedation\n",
          "Status Epilepticus": "IM: 10 mg or 0.2 mg/kg, max 10mg \nIntranasal: 0.2 mg/kg\n",
          "Refractory status epilepticus": "IV: Initial: 0.2 mg/kg\nInfusion: 0.05 to 2 mg/kg/hr titrated to seizure/burst suppression; bolus 0.1 to 0.2 mg/kg as needed and increase rate by 0.05 to 0.1 mg/kg/hr q3-4hr \n",
          "Anxiety, agitation": ""
        },
        "ONSET/DURATION": {
          "Onset": "",
          "Half-life": "3 hr (1.8 to 6.4 hr); prolonged in cirrhosis, CHF, obesity, renal failure, elderly\n",
          "Duration": "IM: up to 6 hr\nIntranasal: 2 hr\nIV (single dose): <2 hr (dose-dependent)\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": "",
          "Excretion": "Urine (as metabolites)\n"
        },
        "WARNINGS": {
          "Contrainidications": "",
          "Warnings": "Dose-dependent respiratory depression especially when used concomitantly with CNS depressants\nPregnancy risk: low\n"
        }
      }
    },
    {
      "name": "OXAZEPAM",
      "_coordinate": "A55",
      "data": {
        "DOSE": {
          "Anxiety, agitation": "PO: Mild-moderate: 10 to 15 mg q6-8hr; severe: 15 to 30 mg q6-8hr\n",
          "Alcohol withdrawal": "PO: 15 to 30 mg q6-8hr\n"
        },
        "ONSET/DURATION": {
          "Onset": "Tmax: ~3 hr\n",
          "Half-life": "8.2 hr (5.7 to 10.9 hr)\n"
        },
        "METABOLISM/EXCRETION": {
          "Metabolism": "Hepatic, glucuronidation (less effect from cirrhosis)\nActive metabolite: no\n",
          "Excretion": "Urine (as inactive metabolite)\n"
        },
        "WARNINGS": {
          "Contrainidications": "Acute narrow angle glaucoma\n",
          "Warnings": "Dose-dependent respiratory depression especially when used concomitantly with CNS depressants\nPregnancy risk: 1st and 3rd trimesters\n"
        }
      }
    },
    {
      "name": "TEMAZEPAM",
      "_coordinate": "A62",
      "data": {
        "DOSE": {},
        "ONSET/DURATION": {},
        "METABOLISM/EXCRETION": {},
        "WARNINGS": {}
      }
    }
  ]
}
