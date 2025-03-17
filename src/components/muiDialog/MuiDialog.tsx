import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

interface MuiDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (param1: any) => void;
    crypto: any;
}

const MuiCustomDialog: React.FC<MuiDialogProps> = ({ open, onClose, crypto, onSubmit }) => {
    const [quantity, setQuantity] = useState<number | string>(0);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setQuantity(isNaN(value) ? "" : value);
    };

    const totalPrice = typeof quantity === "number" ? (quantity * crypto.current_price).toFixed(2) : "0.00";

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Buy Cryptocurrency</DialogTitle>
            <DialogContent>
                <TextField
                    label={`Selected Cryptocurrency: $${crypto.current_price} / ${crypto.symbol}`}
                    fullWidth
                    margin="dense"
                    value={crypto.name}
                >
                    <MenuItem value={crypto.value}>
                        {crypto.label}
                    </MenuItem>
                </TextField>

                <TextField
                    type="number"
                    label="Quantity"
                    fullWidth
                    margin="dense"
                    value={quantity}
                    onChange={handleAmountChange}
                />

                <TextField
                    label="Total Price (USD)"
                    fullWidth
                    margin="dense"
                    value={`$${totalPrice}`}
                    InputProps={{ readOnly: true }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => onSubmit(quantity)}>Buy Now</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuiCustomDialog;
