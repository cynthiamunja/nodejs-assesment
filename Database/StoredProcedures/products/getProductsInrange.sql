CREATE OR ALTER PROCEDURE GetProductsInRange
    @StartRow INT,
    @EndRow INT
AS
BEGIN
    DECLARE @RowCount INT;
    SET @RowCount = @EndRow - @StartRow + 1;

    SELECT *
    FROM Products
    ORDER BY ProductID
    OFFSET @StartRow - 1 ROWS
    FETCH NEXT @RowCount ROWS ONLY;
END
