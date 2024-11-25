# Divvy

A simple expense splitting application

## Intent

I created Divvy as a tool to help me with a problem I was having living with roommates and trying to split 
the expenses and bills when not everyone was ok with equally splitting the total.

Picture this scenario:

- There are total users
- Users 1,2, and 3 are in a group and have agreed to equally split all expenses between the three.
- User 4 only participated in 1 expense so he is only going to contribute to that one particular expense.
- User 5 participated in several expenses but not all, so they will also only be contributing to some expenses.
- Because you are the only responsible one in the group, you are tasked with collecting the money from each User
and paying off all the expenses accordingly.

This, in a nutshell, is the problem I was facing and the inspiration to create Divvy. I wanted a fast and efficient way
to split expenses and get exactly how much money each participating User would be contributing to the total expenses 
and which expenses they were contributing too.

A niche problem? Perhaps, but I didn't find any other applications that provided a solution to my problem, so I created
my own.

## Goals

The main focus of Divvy was accessibility and speed. No need to create account or login, just go to the website, create
a new Divvy, add in all the participants, add all the expenses, and delegate who is paying for what. Get back detailed
results. That's it. Quick, simple, and hassle-free. 

## Caveats

### Lack of data persistence

This is really the one and main caveat. There will be *some* data persistence in the form of data stored locally into
the browsers ***localstorage***, but that obviously means that data will be lost when using a different browser or a new
device. 

However, implementing a proper backend with a database shouldn't be too difficult, or can also opt to use a BaaS like
Firebase or Supabase. It's not a priority given that I expect Divvy to have one sole user (me), but will add it as a
possible feature in the near future.

## Contributions

Sure, why not! If you're interested in helping out, feel free to fork and open an issue. Here are some ideas for
possible new features to add to Divvy.

- Dedicated backend with database for persistent data.
- Ability to export Divvy results as a savable PDF or image file.
- UI/UX improvements
- AI Integration? I'm not sure what AI could do for Divvy but feels like every web app has some 
AI chatbot built-in nowadays.

Feel free to suggest any other ideas.

## Tech Stack

- React
- Typescript
- CSS (modules)
- React Spring (for animations)
- React Router (for routing obviously)
- Zustand (state management)
- localForage (optional but helpful for dealing with local data in the browser)