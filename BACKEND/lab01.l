%{
#include <stdio.h>
%}

%%

[0-9]+          printf("Number detected: %s\n", yytext);
[a-zA-Z]+       printf("Word detected: %s\n", yytext);
[ \t\n]+        ; // Ignore whitespace
.               printf("Unknown character: %s\n", yytext);

%%

int main() {
    printf("Enter the word or any character you want):\n");
    yylex();  
    return 1;
}

int yywrap()
{
    return 1;
}
