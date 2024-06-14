CREATE OR ALTER PROCEDURE FilterProducts
    @MinPrice INT,
    @MaxPrice INT,
    @ProductName VARCHAR(255) = NULL
AS
BEGIN
    SELECT *
    FROM Products
    WHERE ProductPrice BETWEEN @MinPrice AND @MaxPrice
    AND (@ProductName IS NULL OR ProductName = @ProductName );
END
