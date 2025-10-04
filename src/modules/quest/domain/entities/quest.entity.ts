export enum QuestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  RESCUED = 'RESCUED',
  EXPIRED = 'EXPIRED',
}

export enum QuestType {
  LOGIN = 'LOGIN',
  KILL = 'KILL',
  WIN_MATCH = 'WIN_MATCH',
}

export interface Requirement {
  id: string;
  type: QuestType;
  target: number;
  entity?: string;
}

export interface Reward {
  type: 'XP' | 'CURRENCY' | 'ITEM';
  amount: number;
  itemId?: string;
}

export interface QuestDefinition {
  id: string;
  name: string;
  description: string;
  requirements: Requirement[];
  rewards: Reward[];
}

export interface QuestInstance {
  id: string;
  playerId: string;
  questId: string;
  status: QuestStatus;
  progress: Record<string, number>;
  startedAt: Date;
  completedAt?: Date;
}
