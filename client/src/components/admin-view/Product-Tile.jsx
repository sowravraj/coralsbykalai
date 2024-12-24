import { CardContent } from "@mui/material";
import { Card, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 8px;
  width: 78px;
  padding: 10px;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    transform: scale(1.05);
    border: 1px solid black};
  }
`;

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  handleDelete,
}) => {
  return (
    <Card>
      <div className="w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center ">
          <StyledButton
            onClick={() => {
              setOpenCreateProductsDialog(true); // Open the dialog
              setCurrentEditedId(product?._id); // Set the current product ID
              setFormData({
                ...product, // Populate form with product data
              });
              //   console.log("Editing Product: ", product);
              //   console.log("Current Edited ID: ", product?._id);
            }}
          >
            Edit
          </StyledButton>
       
            <StyledButton
              onClick={() => {
                console.log("Product being passed to handleDelete:", product);
                handleDelete(product?._id);
              }}
            >
              Delete
            </StyledButton>
         
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
