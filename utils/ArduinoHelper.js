import React, { Component } from 'react'

export default class ArduinoHelper {
    static send_value(temp, amount, isLight)
    {
        console.log("isLight", isLight)
        var result="z"
        if (temp == 92)
        {
            if (amount == 8)
            {
                result='a'
            }
            else if (amount == 10)
            {
                result='b'
            }
            else if (amount == 12)
            {
                result='c'
            }
        }
        else if (temp == 93)
        {
            if (amount == 8)
            {
                result='d'
            }
            else if (amount == 10)
            {
                result='e'
            }
            else if (amount == 12)
            {
                result='f'
            }
        }
        else if (temp == 94)
        {
            if (amount == 8)
            {
                result='g'
            }
            else if (amount == 10)
            {
                result='h'
            }
            else if (amount == 12)
            {
                result='i'
            }
        }
        else if (temp == 95)
        {
            if (amount == 8)
            {
                result='j'
            }
            else if (amount == 10)
            {
                result='k'
            }
            else if (amount == 12)
            {
                result='l'
            }
        }
        else if (temp == 96)
        {
            if (amount == 8)
            {
                result='m'
            }
            else if (amount == 10)
            {
                result='n'
            }
            else if (amount == 12)
            {
                result="o"
            }
        }
        if (!isLight)
        {
            result=result.toUpperCase();
        }
        return result
    }
}
