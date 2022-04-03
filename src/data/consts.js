import React from "react";

import { Colors } from "../environment/theme/Colors";
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
