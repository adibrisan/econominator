import React from "react";

import { Colors, ChartColors } from "../environment/theme/Colors";
import { Icons } from "../environment/theme/Icons";

export const CATEGORIES = [
  {
    key: 1,
    type: "expense",
    value: "alcohol",
    label: "Alcohol , tobacco",
    icon: () => <Icons.Alcohol />,
  },
  {
    key: 2,
    value: "allowance",
    label: "Children Allowence",
    icon: () => <Icons.Allowance />,
  },
  {
    key: 3,
    type: "expense",
    value: "children",
    label: "Children",
    icon: () => <Icons.Children />,
  },
  {
    key: 4,
    type: "expense",
    value: "financial",
    label: "Financial Expenses",
    icon: () => <Icons.Financial />,
  },
  {
    key: 5,
    type: "expense",
    value: "fines",
    label: "Fines",
    icon: () => <Icons.Fines />,
  },
  {
    key: 5,
    type: "expense",
    value: "food",
    label: "Food & Drinks",
    icon: () => <Icons.Food />,
  },
  {
    key: 6,
    type: "expense",
    value: "fuel",
    label: "Fuel",
    icon: () => <Icons.Fuel />,
  },
  {
    key: 7,
    type: "expense",
    value: "gifts",
    label: "Gifts",
    icon: () => <Icons.Gift />,
  },
  {
    key: 8,
    type: "expense",
    value: "groceries",
    label: "Groceries",
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
    label: "House",
    icon: () => <Icons.House />,
  },
  { key: 13, value: "income", label: "Income", icon: () => <Icons.Income /> },
  {
    key: 14,
    type: "expense",
    value: "insurance",
    label: "Insurance",
    icon: () => <Icons.Insurance />,
  },
  {
    key: 15,
    value: "investments",
    label: "Investments",
    icon: () => <Icons.Investments fill={Colors.scarlet} />,
  },
  {
    key: 16,
    type: "expense",
    value: "entertainment",
    label: "Life & Entertainment",
    icon: () => <Icons.Enterntainment />,
  },
  {
    key: 17,
    type: "expense",
    value: "other",
    label: "Other",
    icon: () => <Icons.Other fill={Colors.scarlet} />,
  },
  {
    key: 18,
    type: "expense",
    value: "rent",
    label: "Rent",
    icon: () => <Icons.Rent />,
  },
  { key: 19, value: "sales", label: "Sales", icon: () => <Icons.Sales /> },
  {
    key: 20,
    value: "savings",
    label: "Savings",
    icon: () => <Icons.Savings />,
  },
  {
    key: 21,
    type: "expense",
    value: "sport",
    label: "Sport Activities",
    icon: () => <Icons.Sport />,
  },
  {
    key: 22,
    type: "expense",
    value: "subscriptions",
    label: "Subscriptions & Books & Audio",
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
    label: "Utilities",
    icon: () => <Icons.Utilities />,
  },
  {
    key: 25,
    type: "expense",
    value: "vehicle",
    label: "Vehicle",
    icon: () => <Icons.Vehicle />,
  },
];

export const CHART_DATA = [
  {
    id: 1,
    type: "expense",
    value: "alcohol",
    name: "Alcohol , tobacco",
    color: ChartColors.affair,
    // icon: Icons.Alcohol,
  },
  {
    id: 2,
    value: "allowance",
    name: "Children Allowence",
    color: ChartColors.algaeGreen,
    // icon: Icons.Allowance,
  },
  {
    id: 3,
    type: "expense",
    value: "children",
    name: "Children",
    color: ChartColors.alizarinCrimson,
    // icon: Icons.Children,
  },
  {
    id: 4,
    type: "expense",
    value: "financial",
    name: "Financial Expenses",
    color: ChartColors.almondFrost,
    // icon: Icons.Financial,
  },
  {
    id: 5,
    type: "expense",
    value: "fines",
    name: "Fines",
    color: ChartColors.alpine,
    // icon: Icons.Fines,
  },
  {
    id: 6,
    type: "expense",
    value: "food",
    name: "Food & Drinks",
    color: ChartColors.amber,
    // icon: Icons.Food,
  },
  {
    id: 7,
    type: "expense",
    value: "fuel",
    name: "Fuel",
    color: ChartColors.aquaDeep,
    // icon: Icons.Fuel,
  },
  {
    id: 8,
    type: "expense",
    value: "gifts",
    name: "Gifts",
    color: ChartColors.barossa,
    // icon: Icons.Gift,
  },
  {
    id: 9,
    type: "expense",
    value: "groceries",
    name: "Groceries",
    color: ChartColors.beautyBush,
    // icon: Icons.Groceries,
  },
  {
    id: 10,
    type: "expense",
    value: "pc",
    name: "Hardware & PC",
    color: ChartColors.magenta,
    // icon: Icons.Pc,
  },
  {
    id: 11,
    type: "expense",
    value: "hobbies",
    name: "Hobbies",
    color: ChartColors.burningOrange,
    // icon: Icons.Hobbies,
  },
  {
    id: 13,
    type: "expense",
    value: "house",
    name: "House",
    color: ChartColors.danube,
    // icon: Icons.House,
  },
  {
    id: 14,
    value: "income",
    name: "Income",
    color: ChartColors.kabul,
    // icon: Icons.Income,
  },
  {
    id: 15,
    type: "expense",
    value: "insurance",
    name: "Insurance",
    color: ChartColors.desert,
    // icon: Icons.Insurance,
  },
  {
    id: 16,
    value: "investments",
    name: "Investments",
    color: ChartColors.foggyGray,
    // icon: Icons.Investments,
  },
  {
    id: 17,
    type: "expense",
    value: "entertainment",
    name: "Life & Entertainment",
    color: ChartColors.frenchLilac,
    // icon: Icons.Enterntainment,
  },
  {
    id: 18,
    type: "expense",
    value: "other",
    name: "Other",
    color: ChartColors.frenchRose,
    // icon: Icons.Other,
  },
  {
    id: 19,
    type: "expense",
    value: "rent",
    name: "Rent",
    color: ChartColors.ginFizz,
    // icon: Icons.Rent,
  },
  {
    id: 20,
    value: "sales",
    label: "Sales",
    color: ChartColors.persianBlue,
    // icon: Icons.Sales,
  },
  {
    id: 21,
    value: "savings",
    name: "Savings",
    color: ChartColors.glaciar,
    // icon: Icons.Savings,
  },
  {
    id: 22,
    type: "expense",
    value: "sport",
    name: "Sport Activities",
    color: ChartColors.greenYellow,
    // icon: Icons.Sport,
  },
  {
    id: 23,
    type: "expense",
    value: "subscriptions",
    name: "Subscriptions & Books & Audio",
    color: ChartColors.harleQuin,
    // icon: Icons.Subscriptions,
  },
  {
    id: 24,
    type: "expense",
    value: "transport",
    name: "Transport",
    color: ChartColors.heliotrope,
    // icon: Icons.Transport,
  },
  {
    id: 25,
    type: "expense",
    value: "utilities",
    name: "Utilities",
    color: ChartColors.hippiePink,
    // icon: Icons.Utilities,
  },
  {
    id: 26,
    type: "expense",
    value: "vehicle",
    name: "Vehicle",
    color: ChartColors.husk,
    // icon: Icons.Vehicle,
  },
];

export const getCurrentMonth = (currentMonth) => {
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
};
