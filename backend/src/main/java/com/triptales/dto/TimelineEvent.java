package com.triptales.dto;

public class TimelineEvent {

    private Long id;
    private String date;
    private String time;
    private String type;
    private String icon;
    private String title;
    private String description;
    private Double amount;

    public TimelineEvent() {
    }

    public TimelineEvent(
            Long id,
            String date,
            String time,
            String type,
            String icon,
            String title,
            String description,
            Double amount
    ) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.type = type;
        this.icon = icon;
        this.title = title;
        this.description = description;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getType() {
        return type;
    }

    public String getIcon() {
        return icon;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Double getAmount() {
        return amount;
    }
}
