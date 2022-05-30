import React from "react";

import { locale } from "expo-localization";
import { Colors, ChartColors } from "../environment/theme/Colors";
import { Icons } from "../environment/theme/Icons";

export const CATEGORIES = [
  {
    key: 1,
    type: "expense",
    value: "alcohol",
    label: locale == "ro-RO" ? "Alcool , tutun" : "Alcohol , tobacco",
    icon: () => <Icons.Alcohol />,
  },
  {
    key: 2,
    value: "allowance",
    label: locale == "ro-RO" ? "Alocație pentru copii" : "Children Allowence",
    icon: () => <Icons.Allowance />,
  },
  {
    key: 3,
    type: "expense",
    value: "children",
    label: locale == "ro-RO" ? "Copii" : "Children",
    icon: () => <Icons.Children />,
  },
  {
    key: 4,
    type: "expense",
    value: "financial",
    label: locale == "ro-RO" ? "Cheltuieli financiare" : "Financial Expenses",
    icon: () => <Icons.Financial />,
  },
  {
    key: 5,
    type: "expense",
    value: "fines",
    label: locale == "ro-RO" ? "Amenzi" : "Fines",
    icon: () => <Icons.Fines />,
  },
  {
    key: 5,
    type: "expense",
    value: "food",
    label: locale == "ro-RO" ? "Mâncare și băutură" : "Food & Drinks",
    icon: () => <Icons.Food />,
  },
  {
    key: 6,
    type: "expense",
    value: "fuel",
    label: locale == "ro-RO" ? "Combustibil" : "Fuel",
    icon: () => <Icons.Fuel />,
  },
  {
    key: 7,
    type: "expense",
    value: "gifts",
    label: locale == "ro-RO" ? "Cadouri" : "Gifts",
    icon: () => <Icons.Gift />,
  },
  {
    key: 8,
    type: "expense",
    value: "groceries",
    label: locale == "ro-RO" ? "Cumpărături" : "Groceries",
    icon: () => <Icons.Groceries />,
  },
  {
    key: 9,
    type: "expense",
    value: "pc",
    label: "Hardware & PC",
    icon: () => <Icons.Pc />,
  },
  {
    key: 10,
    type: "expense",
    value: "hobbies",
    label: "Hobbies",
    icon: () => <Icons.Hobbies />,
  },
  {
    key: 12,
    type: "expense",
    value: "house",
    label: locale == "ro-RO" ? "Casă" : "House",
    icon: () => <Icons.House />,
  },
  {
    key: 13,
    value: "income",
    label: locale == "ro-RO" ? "Venit" : "Income",
    icon: () => <Icons.Income />,
  },
  {
    key: 14,
    type: "expense",
    value: "insurance",
    label: locale == "ro-RO" ? "Asigurari" : "Insurance",
    icon: () => <Icons.Insurance />,
  },
  {
    key: 15,
    value: "investments",
    label: locale == "ro-RO" ? "Investiții" : "Investments",
    icon: () => <Icons.Investments fill={Colors.scarlet} />,
  },
  {
    key: 16,
    type: "expense",
    value: "entertainment",
    label: locale == "ro-RO" ? "Viață și divertisment" : "Life & Entertainment",
    icon: () => <Icons.Enterntainment />,
  },
  {
    key: 17,
    type: "expense",
    value: "other",
    label: locale == "ro-RO" ? "Altele" : "Other",
    icon: () => <Icons.Other fill={Colors.scarlet} />,
  },
  {
    key: 18,
    type: "expense",
    value: "rent",
    label: locale == "ro-RO" ? "Chirie" : "Rent",
    icon: () => <Icons.Rent />,
  },
  {
    key: 19,
    value: "sales",
    label: locale == "ro-RO" ? "Vânzări" : "Sales",
    icon: () => <Icons.Sales />,
  },
  {
    key: 20,
    value: "savings",
    label: locale == "ro-RO" ? "Economii" : "Savings",
    icon: () => <Icons.Savings />,
  },
  {
    key: 21,
    type: "expense",
    value: "sport",
    label: locale == "ro-RO" ? "Activități sportive" : "Sport Activities",
    icon: () => <Icons.Sport />,
  },
  {
    key: 22,
    type: "expense",
    value: "subscriptions",
    label:
      locale == "ro-RO"
        ? "Abonamente și cărți și audio"
        : "Subscriptions & Books & Audio",
    icon: () => <Icons.Subscriptions />,
  },
  {
    key: 23,
    type: "expense",
    value: "transport",
    label: "Transport",
    icon: () => <Icons.Transport />,
  },
  {
    key: 24,
    type: "expense",
    value: "utilities",
    label: locale == "ro-RO" ? "Utilități" : "Utilities",
    icon: () => <Icons.Utilities />,
  },
  {
    key: 25,
    type: "expense",
    value: "vehicle",
    label: locale == "ro-RO" ? "Vehicul" : "Vehicle",
    icon: () => <Icons.Vehicle />,
  },
];

export const CHART_DATA = [
  {
    id: 1,
    type: "expense",
    value: "alcohol",
    name: locale == "ro-RO" ? "Alcool , tutun" : "Alcohol , tobacco",
    color: ChartColors.affair,
  },
  {
    id: 2,
    value: "allowance",
    name: locale == "ro-RO" ? "Alocație pentru copii" : "Children Allowence",
    color: ChartColors.algaeGreen,
  },
  {
    id: 3,
    type: "expense",
    value: "children",
    name: locale == "ro-RO" ? "Copii" : "Children",
    color: ChartColors.alizarinCrimson,
  },
  {
    id: 4,
    type: "expense",
    value: "financial",
    name: locale == "ro-RO" ? "Cheltuieli financiare" : "Financial Expenses",
    color: ChartColors.almondFrost,
  },
  {
    id: 5,
    type: "expense",
    value: "fines",
    name: locale == "ro-RO" ? "Amenzi" : "Fines",
    color: ChartColors.alpine,
  },
  {
    id: 6,
    type: "expense",
    value: "food",
    name: locale == "ro-RO" ? "Mâncare și băutură" : "Food & Drinks",
    color: ChartColors.amber,
  },
  {
    id: 7,
    type: "expense",
    value: "fuel",
    name: locale == "ro-RO" ? "Combustibil" : "Fuel",
    color: ChartColors.aquaDeep,
  },
  {
    id: 8,
    type: "expense",
    value: "gifts",
    name: locale == "ro-RO" ? "Cadouri" : "Gifts",
    color: ChartColors.barossa,
  },
  {
    id: 9,
    type: "expense",
    value: "groceries",
    name: locale == "ro-RO" ? "Cumpărături" : "Groceries",
    color: ChartColors.beautyBush,
  },
  {
    id: 10,
    type: "expense",
    value: "pc",
    name: "Hardware & PC",
    color: ChartColors.magenta,
  },
  {
    id: 11,
    type: "expense",
    value: "hobbies",
    name: "Hobbies",
    color: ChartColors.burningOrange,
  },
  {
    id: 13,
    type: "expense",
    value: "house",
    name: locale == "ro-RO" ? "Casă" : "House",
    color: ChartColors.danube,
  },
  {
    id: 14,
    value: "income",
    name: locale == "ro-RO" ? "Venit" : "Income",
    color: ChartColors.kabul,
  },
  {
    id: 15,
    type: "expense",
    value: "insurance",
    name: locale == "ro-RO" ? "Asigurari" : "Insurance",
    color: ChartColors.desert,
  },
  {
    id: 16,
    value: "investments",
    name: locale == "ro-RO" ? "Investiții" : "Investments",
    color: ChartColors.foggyGray,
  },
  {
    id: 17,
    type: "expense",
    value: "entertainment",
    name: locale == "ro-RO" ? "Viață și divertisment" : "Life & Entertainment",
    color: ChartColors.frenchLilac,
  },
  {
    id: 18,
    type: "expense",
    value: "other",
    name: locale == "ro-RO" ? "Altele" : "Other",
    color: ChartColors.frenchRose,
  },
  {
    id: 19,
    type: "expense",
    value: "rent",
    name: locale == "ro-RO" ? "Chirie" : "Rent",
    color: ChartColors.ginFizz,
  },
  {
    id: 20,
    value: "sales",
    name: locale == "ro-RO" ? "Vânzări" : "Sales",
    color: ChartColors.persianBlue,
  },
  {
    id: 21,
    value: "savings",
    name: locale == "ro-RO" ? "Economii" : "Savings",
    color: ChartColors.glaciar,
  },
  {
    id: 22,
    type: "expense",
    value: "sport",
    name: locale == "ro-RO" ? "Activități sportive" : "Sport Activities",
    color: ChartColors.greenYellow,
  },
  {
    id: 23,
    type: "expense",
    value: "subscriptions",
    name:
      locale == "ro-RO"
        ? "Abonamente și cărți și audio"
        : "Subscriptions & Books & Audio",
    color: ChartColors.harleQuin,
  },
  {
    id: 24,
    type: "expense",
    value: "transport",
    name: "Transport",
    color: ChartColors.heliotrope,
  },
  {
    id: 25,
    type: "expense",
    value: "utilities",
    name: locale == "ro-RO" ? "Utilități" : "Utilities",
    color: ChartColors.hippiePink,
  },
  {
    id: 26,
    type: "expense",
    value: "vehicle",
    name: locale == "ro-RO" ? "Vehicul" : "Vehicle",
    color: ChartColors.husk,
  },
];

export const getCurrentMonth = (currentMonth) => {
  if (locale == "en-GB") {
    switch (currentMonth) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  } else if (locale == "ro-RO") {
    switch (currentMonth) {
      case 0:
        return "Ianuarie";
      case 1:
        return "Februarie";
      case 2:
        return "Martie";
      case 3:
        return "Aprilie";
      case 4:
        return "Mai";
      case 5:
        return "Iunie";
      case 6:
        return "Iulie";
      case 7:
        return "August";
      case 8:
        return "Septembrie";
      case 9:
        return "Octombrie";
      case 10:
        return "Noiembrie";
      case 11:
        return "Decembrie";
    }
  }
};
