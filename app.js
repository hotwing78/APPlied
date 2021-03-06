"use strict";
$(document).ready(function() {
    apply.init()
});
var apply = {
    init: function() {
        apply.events()
    },
    loadedJobs: [],
    events: function() {
        $("#logInButton").on("click", function() {
            event.preventDefault();
            var t = {
                username: $("#userName").val(),
                password: $("#password").val()
            };
            $("#logIn").fadeOut(2e3, function() {
                $("header").removeClass("hidden")
            }), console.log(JSON.stringify(t)), $.ajax({
                method: "POST",
                url: "/login",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(t),
                success: function(t) {
                    console.log("this is my login", t)
                },
                error: function(t) {
                    console.error("something went wrong", t)
                }
            }), apply.read()
        }), $("#apply").on("click", function() {
            event.preventDefault();
            var t = {
                companyName: $('input[name = "company"]').val(),
                salary: $('input[name = "salary"]').val(),
                applied: !0,
                location: $('input[name = "location"]').val(),
                contactName: $('input[name = "contactName"]').val(),
                contactNumber: $('input[name = "phone"]').val(),
                contactEmail: $('input[name = "email"]').val(),
                comments: $('textarea[name = "comments"]').val()
            };
            console.log(t), apply.create(JSON.stringify(t)), apply.read()
        })
    },
    create: function(t) {
        $.ajax({
            url: "/jobs",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function(t) {
                apply.read(), console.log(t)
            },
            error: function(t) {
                console.error(t)
            }
        })
    },
    read: function() {
        $.ajax({
            url: "/jobs",
            method: "GET",
            success: function(t) {
                $("#appliedTo ul").html(""), console.log(t), t = JSON.parse(t), t.forEach(function(t) {
                    console.log("this is the item", t), $("#appliedTo ul").append('<li data-jobid="' + t.jobId + '"><fieldset>\n                    Company: <span>' + t.companyName + '</span> <input type="text" class="company-edit edit-hidden" value="' + t.companyName + '"></br>\n                    Salary: <span>' + t.location + '</span> <input type="text" class="location-edit edit-hidden" value="' + t.location + '"></br>\n                    Location: <span>' + t.salary + '</span> <input type="text" class="salary-edit edit-hidden" value="' + t.salary + '"></br>\n                    Contact-Name: <span>' + t.contactName + '</span> <input type="text" class="contactName-edit edit-hidden" value="' + t.contactName + '"></br>\n                    Contact-Number: <span>' + t.contactNumber + '</span> <input type="text" class="contactNumber-edit edit-hidden" value="' + t.contactNumber + '"></br>\n                    Contact-Email: <span>' + t.contactEmail + '</span> <input type="text" class="contactEmail-edit edit-hidden" value="' + t.contactEmail + '"></br>\n                    Comments: <span>' + t.comments + '</span> <input type="text" class="comments-edit edit-hidden" value="' + t.comments + "\"></fieldset>\n                    <button class='delete-btn' data-jobid=\"" + t.jobId + '">deleteAPP</button>\n                    <button class="edit-btn edit-hidden" data-jobid="' + t.jobId + '">editAPP</button>\n                    <button class="show-edit-btn">edit</button>\n                    </li>')
                }), apply.destroyButton()
            },
            error: function(t) {
                console.error(t)
            }
        })
    },
    update: function(t) {
        $.ajax({
            url: "/jobs",
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function(t) {
                apply.read()
            },
            error: function(t) {
                console.error(t)
            }
        })
    },
    destroy: function(t) {
        $.ajax({
            url: "/jobs/" + t,
            method: "DELETE",
            success: function(t) {
                apply.read()
            },
            error: function(t) {
                console.error(t)
            }
        })
    },
    destroyButton: function() {
        $(".delete-btn").on("click", function(t) {
            t.preventDefault();
            var n = $(this).data("jobid");
            console.log("cleared", n), apply.destroy(n)
        }), $(".edit-btn").on("click", function(t) {
            t.preventDefault();
            var n = $(this).parent(),
                e = {
                    companyName: n.find(".company-edit").val(),
                    salary: n.find(".salary-edit").val(),
                    applied: !0,
                    location: n.find(".location-edit").val(),
                    contactName: n.find(".contactName-edit").val(),
                    contactNumber: n.find(".contactNumber-edit").val(),
                    contactEmail: n.find(".contactEmail-edit").val(),
                    comments: n.find(".comments-edit").val(),
                    jobId: n.data("jobid")
                };
            console.log("edited", e), apply.update(JSON.stringify(e))
        }), $(".show-edit-btn").on("click", function(t) {
            t.preventDefault();
            var n = $(this).parent();
            console.log("edited", n), n.find("span").toggleClass("edit-hidden"), n.find("input").toggleClass("edit-hidden"), n.find("button").toggleClass("edit-hidden")
        })
    }
};