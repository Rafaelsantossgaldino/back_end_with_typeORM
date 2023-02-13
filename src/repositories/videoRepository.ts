import { PostgresDataSource } from "../data-source";
import { Video } from "../entities/Video";

export const videoRepository = PostgresDataSource.getRepository(Video)
