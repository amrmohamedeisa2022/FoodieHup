package com.myApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String country;
    private String city;
    private String postalCode;
    private String streetAddress;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
