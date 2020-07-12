import { Response, Request, request, response } from 'express';
import knex from '../database/connection';

class PointsController {

    async show(req: Request, res: Response){
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.'})
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);

       return res.json({point, items});
    }

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