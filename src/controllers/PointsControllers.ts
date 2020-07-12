import { Response, Request } from 'express';
import knex from '../database/connection';

class PointsController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
         } = req.body;
    
         const trx = await knex.transaction();

         const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
         }

    
         const inserts = await trx('points').insert(point);
         console.log(inserts);
         
    
         const point_id = inserts[0];
    
         const pointItems =  items.map((item_id: number) => {
             console.log(item_id, point_id);
             
             return {
                 item_id,
                 point_id,
             }
         })
    
         await trx('point_items').insert(pointItems);

         trx.commit();
    
        return res.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsController;