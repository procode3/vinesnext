import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "math",
    label: "Math",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "biology",
    label: "Biology",
  },
  {
    value: "history",
    label: "History",
  },
  {
    value: "geography",
    label: "Geography",
  },
  {
    value: "chemistry",
    label: "Chemistry",
  },
  {
    value: "physics",
    label: "Physics",
  },
  {
    value: "literature",
    label: "Literature",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "engineering",
    label: "Engineering",
  },
  {
    value: "computer_science",
    label: "Computer Science",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "law",
    label: "Law",
  },
  {
    value: "philosophy",
    label: "Philosophy",
  },
  {
    value: "psychology",
    label: "Psychology",
  },
  {
    value: "political_science",
    label: "Political Science",
  },
  {
    value: "sociology",
    label: "Sociology",
  },
  {
    value: "statistics",
    label: "Statistics",
  },
  {
    value: "accounting",
    label: "Accounting",
  },
  {
    value: "programming",
    label: "Programming",
  },
  {
    value: "other",
    label: "Other",
  },
  {
    value: "social_studies",
    label: "Social Studies",
  },
  {
    value: "social_science",
    label: "Social Science",
  },
];

export const statuses = [
  {
    value: "available",
    label: "Available",
    icon: CircleIcon,
  },
  {
    value: "new",
    label: "New",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "uncofirmed",
    label: "Unconfirmed",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "inprogress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    value: "revision",
    label: "Revision",
    icon: CrossCircledIcon,
  },
  {
    value: "dispute",
    label: "Dispute",
    icon: CrossCircledIcon,
  },
  {
    value: "refunded",
    label: "Refunded",
    icon: CrossCircledIcon,
  },
  {
    value: "Editing",
    label: "Editing",
    icon: StopwatchIcon,
  }
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "Urgent",
    value: "high",
    icon: ArrowUpIcon,
  },
]
