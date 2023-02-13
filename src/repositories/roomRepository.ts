import { PostgresDataSource } from "../data-source";
import { Room } from "../entities/Room";

export const roomRepository = PostgresDataSource.getRepository(Room)
