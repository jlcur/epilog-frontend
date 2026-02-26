export type BaseEntity = {
	id: string;
	created_at: Date;
	updated_at: Date;
};

export type Entity<T> = {
	[K in keyof T]: T[K];
} & BaseEntity;

export type Comment = Entity<{
	content: string;
}>;
