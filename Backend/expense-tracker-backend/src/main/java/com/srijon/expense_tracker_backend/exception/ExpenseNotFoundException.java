package com.srijon.expense_tracker_backend.exception;

public class ExpenseNotFoundException extends RuntimeException{

    public ExpenseNotFoundException(String message){
        super(message);
    }

}
