package com.srijon.expense_tracker_backend.controller;

import com.srijon.expense_tracker_backend.model.Expense;
import com.srijon.expense_tracker_backend.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tools.jackson.core.PrettyPrinter;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    //Creating the object service class
    private final ExpenseService expenseService;

    //Injecting using constructor
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    //Logic of getting all the data from the database
    @GetMapping
    public List<Expense> getAllExpenses(){
        return expenseService.getAllExpenses();
    }

    //Logic of getting the expenses using an ID
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
    }

    //Logic of adding expenses
    @PostMapping
    public ResponseEntity<Expense> addExpense(@Valid @RequestBody Expense expense){
        Expense savedExpense = expenseService.addExpense(expense);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedExpense);
    }

    //Logic of updating any expense that is present in database
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expense){
         Expense updateExpense = expenseService.updateExpense(id,expense);

         return ResponseEntity.ok(updateExpense);
    }

    //Logic of deleting any expense from our database
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);

        return ResponseEntity.noContent().build();
    }
}
