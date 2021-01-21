# Project-3-Interactive-Form
Project 3, Interactive Form

//Real Time Validation
The only field that currently has real time validation is the credit card number field. Since the error message is concerned
with whether the user has entered 13-16 digits, it seemed an appropriate field to use for real time validation. The error message
you stop when the user has entered at least 13 digits and restart if they exceed 16 digits.

//Conditional Error Messages
The email field has conditional error messages. While the original HTML includes a default message of
"Email address must be formatted correctly", I have included a code section inside the validateEmail function
that dynamically changes the messages depending on the error. The original error message will display if the
regex verification fails. If the field is left blank, "the email address field cannot be blank" should be the
displayed message.
