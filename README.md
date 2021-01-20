# Project-3-Interactive-Form
Project 3, Interactive Form

//Real Time Validation
The only field that currently has real time validation is the name field. It should spawn an error if the user
attempts to either leave it blank or uses incompatible characters. As my friend pointed out, Elon Musk's child
can never attend this conference, because numbers are not accepted in this field.

//Conditional Error Messages
The email field has conditional error messages. While the original HTML includes a default message of
"Email address must be formatted correctly", I have included a code section inside the validateEmail function
that dynamically changes the messages depending on the error. The original error message will display if the
regex verification fails. If the field is left blank, "the email address field cannot be blank" should be the
displayed message.
