interface Order {
  name: string;
  orderType: string;
  clientDeadline: string;
  writerDeadline: string;
  pages: string;
  words: number;
  subject: string;
  topic: string;
  description: string;
  writerFee: number;
  amountReceived: number;
  educationLevel: string[] | string;
  writerLevel: string;
  clientFiles: string[] | string;
  orderStatus: string;
  userId: string;
  writerId: string;
  assignedById?: string;
  orderNumber: string;
  clientId?: string;
  citationStyle: string;
  sources: number;
  spacing: string;
  fileType: [];
}

export type OrderForm = Omit<
  Order,
  'userId' | 'assignedById' | 'clientId' | 'writerId' | 'orderStatus'
>;
