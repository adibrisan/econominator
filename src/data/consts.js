import React from "react";

import { Colors } from "../environment/theme/Colors";
import { Icons } from "../environment/theme/Icons";

export const CATEGORIES = [
  {
    key: 1,
    value: "alcohol",
    label: "Alcohol , obacco",
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
    value: "children",
    label: "Children",
    icon: () => <Icons.Children />,
  },
  {
    key: 4,
    value: "financial",
    label: "Financial Expenses",
    icon: () => <Icons.Financial />,
  },
  { key: 5, value: "fines", label: "Fines", icon: () => <Icons.Fines /> },
  { key: 5, value: "food", label: "Food & Drinks", icon: () => <Icons.Food /> },
  { key: 6, value: "fuel", label: "Fuel", icon: () => <Icons.Fuel /> },
  { key: 7, value: "gifts", label: "Gifts", icon: () => <Icons.Gift /> },
  {
    key: 8,
    value: "groceries",
    label: "Groceries",
    icon: () => <Icons.Groceries />,
  },
  { key: 9, value: "pc", label: "Hardware & PC", icon: () => <Icons.Pc /> },
  {
    key: 10,
    value: "hobbies",
    label: "Hobbies",
    icon: () => <Icons.Hobbies />,
  },
  { key: 12, value: "house", label: "House", icon: () => <Icons.House /> },
  { key: 13, value: "income", label: "Income", icon: () => <Icons.Income /> },
  {
    key: 14,
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
    value: "entertainment",
    label: "Life & Entertainment",
    icon: () => <Icons.Enterntainment />,
  },
  {
    key: 17,
    value: "other",
    label: "Other",
    icon: () => <Icons.Other fill={Colors.scarlet} />,
  },
  { key: 18, value: "rent", label: "Rent", icon: () => <Icons.Rent /> },
  { key: 19, value: "sales", label: "Sales", icon: () => <Icons.Sales /> },
  {
    key: 20,
    value: "savings",
    label: "Savings",
    icon: () => <Icons.Savings />,
  },
  {
    key: 21,
    value: "sport",
    label: "Sport Activities",
    icon: () => <Icons.Sport />,
  },
  {
    key: 22,
    value: "subscriptions",
    label: "Subscriptions & Books & Audio",
    icon: () => <Icons.Subscriptions />,
  },
  {
    key: 23,
    value: "transport",
    label: "Transport",
    icon: () => <Icons.Transport />,
  },
  {
    key: 24,
    value: "utilities",
    label: "Utilities",
    icon: () => <Icons.Utilities />,
  },
  {
    key: 25,
    value: "vehicle",
    label: "Vehicle",
    icon: () => <Icons.Vehicle />,
  },
];
