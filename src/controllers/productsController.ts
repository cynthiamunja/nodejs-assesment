import { Request, Response } from 'express';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import { Product, ProductRequest ,deletedCategory} from '../models/productsModel';
import { DbHelper } from '../DataBaseHelper'

const dbInstance=new DbHelper()

export const addProduct = async (req: ProductRequest, res: Response) => {
    try {
        // Generate unique ID for the product
        const id = uid();

        // Destructure the request body to get the required fields
        const { ProductName, ProductPrice, CategoryID } = req.body;

        await dbInstance.exec("addProduct",{ ProductID:id, ProductPrice, ProductName,CategoryID})
        console.log(id)
        // Send a success response
        res.status(201).json({ message: "Product created successfully" });

        // Make a request to the database
        // const pool = await mssql.connect(sqlConfig);
        
        // // Execute the stored procedure 'addProduct' with the correct parameter names
        // await pool.request()
        //      .input('ProductID', id)
        //     .input('ProductName', ProductName)
        //     .input('ProductPrice',  ProductPrice)
        //     .input('CategoryID', CategoryID)
        //     .execute('addProduct');

            
    } catch (error) {
        // Handle errors
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product', error });
    }
};



export const searchProductsByName = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {

        const {ProductName}= req.body
        const result = await pool.request()
        .input('ProductName', ProductName)
        .execute('SearchProductsByName');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'couldnt get products' });
    } 
};

export const FilterProducts = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {
    
        const { MinPrice, MaxPrice, ProductName } = req.body;
        
        // Ensure minPrice and maxPrice are parsed as integers
        const parsedMinPrice = parseInt(MinPrice, 10);
        const parsedMaxPrice = parseInt(MaxPrice, 10);

        // Validate parsed values
        if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
            return res.status(400).json({ message: 'Invalid price range parameters' });
        }

        // Execute the stored procedure
        const result = await pool.request()
            .input('MinPrice', mssql.Int, parsedMinPrice)
            .input('MaxPrice', mssql.Int, parsedMaxPrice)
            .input('ProductName', mssql.VarChar(255), ProductName || null)
            .execute('FilterProducts');


        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting products ', error);
        res.status(500).json({ message: 'couldnt get products ' });
    } 
};

export const GetProductsInRange = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {
        const { StartRow, EndRow } = req.body;
       
        const result = await pool.request()
        .input('StartRow',  StartRow)
            .input('EndRow',  EndRow)
            .execute('GetProductsInRange');

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting products in range:', error);
        res.status(500).json({ message: 'couldnt get products in range' });
    } 
};