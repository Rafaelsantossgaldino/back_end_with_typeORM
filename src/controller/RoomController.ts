import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { Subject } from "typeorm/persistence/Subject";


export class RoomController {
 async create(req: Request, res: Response){
  const {name, descriptin} = req.body

  try {
    const newRoom = roomRepository.create({name, descriptin})
    
    await roomRepository.save(newRoom)

    return res.status(201).json(newRoom)
  } catch(error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server'})
  }
 }
 
  async createVideo(req: Request, res: Response){
    const {titles, url} = req.body
    const { idRoom } = req.params

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) })
      
      if (!room) {
        return res.status(404).json({ message: 'Aula nao existe' })
      }

      const newVideo = videoRepository.create({
        titles,
        url,
        room
      })

      await videoRepository.save(newVideo)

      return res.status(201).json(newVideo)
    } catch(error) {
      console.log(error)
      return res.status(500).json({message: 'Internal Server'})
    }
  }

  async roomSubject(req: Request, res: Response){
    const {subject_id} = req.body
    const { idRoom } = req.params 

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) })
      
      if (!room) {
        return res.status(404).json({ message: 'Aula nao existe' })
      }

      const subject = await subjectRepository.findOneBy({ id: Number(subject_id) })

      if (!subject) {
        return res.status(404).json({ message: 'Disciplina nao existe' })
      }

      const roomUpdate = {
        ...room,
        subjects: [subject],
      }

      await roomRepository.save(roomUpdate)

      return res.status(204).send()
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Internal Server'})
    }
  }

  async list(req: Request, res: Response){
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true
        }
      })

      return res.status(200).json(rooms)
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Internal Server'})
    }
  }
}
