CREATE OR ALTER PROCEDURE SearchProductsByName
    @ProductName VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Products
    WHERE ProductName = @ProductName ;
END
