package com.srijon.expense_tracker_backend.controller;

import com.srijon.expense_tracker_backend.model.Expense;
import com.srijon.expense_tracker_backend.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

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
    public Optional<Expense> getExpenseById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
    }

    //Logic of adding expenses
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense){
        return expenseService.addExpense(expense);
    }

    //Logic of updating any expense that is present in database
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense){
         return expenseService.updateExpense(id,expense);
    }

    //Logic of deleting any expense from our database
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
    }
}
