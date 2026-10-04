export interface RawSkill {
  readonly name: string;
  readonly icon: string;
  readonly description: string;
}

export interface TitleDeckItem {
  readonly id: string;
  readonly type: 'title';
  readonly title: string;
  readonly description: string;
}

export interface SubtitleDeckItem {
  readonly id: string;
  readonly type: 'subtitle';
  readonly title: string;
  readonly description: string;
}

export interface SkillDeckItem {
  readonly id: string;
  readonly type: 'skill';
  readonly title: string;
  readonly icon: string;
  readonly description: string;
}

export type DeckItem = TitleDeckItem | SubtitleDeckItem | SkillDeckItem;