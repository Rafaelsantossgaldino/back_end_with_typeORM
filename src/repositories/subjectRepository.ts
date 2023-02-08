import { PostgresDataSource } from "../data-source";
import { Subject } from "../entities/Subject";

export const subjectRepository = PostgresDataSource.getRepository(Subject)
