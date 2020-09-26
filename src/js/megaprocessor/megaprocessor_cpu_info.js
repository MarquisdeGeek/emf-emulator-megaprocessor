// megaprocessor_cpu_info
let megaprocessor_cpu_info = (function(bus, options) {
  // Reference:  page 34

  // 00               : move r0,r0;      ud0x0**i

  // Reference:  page 53

  // 00               : sxt r0;          ud0x0**i

  // Reference:  page 34

  // 01               : move r1,r0;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 02               : move r2,r0;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 03               : move r3,r0;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 04               : move r0,r1;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 05               : move r1,r1;      ud0x0**i

  // Reference:  page 53

  // 05               : sxt r1;          ud0x0**i

  // Reference:  page 34

  // 06               : move r2,r1;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 07               : move r3,r1;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 08               : move r0,r2;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 09               : move r1,r2;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 0a               : move r2,r2;      ud0x0**i

  // Reference:  page 53

  // 0a               : sxt r2;          ud0x0**i

  // Reference:  page 34

  // 0b               : move r3,r2;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 0c               : move r0,r3;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 0d               : move r1,r3;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 0e               : move r2,r3;      ud0x0**i

  // Reference:  page 53
  // Reference:  page 34

  // 0f               : move r3,r3;      ud0x0**i

  // Reference:  page 53

  // 0f               : sxt r3;          ud0x0**i

  // Reference:  page 9

  // 10               : and r0,r0;       ud0x0**i

  // Reference:  page 55

  // 10               : test r0;         ud0x0**i

  // Reference:  page 9

  // 11               : and r1,r0;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 12               : and r2,r0;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 13               : and r3,r0;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 14               : and r0,r1;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 15               : and r1,r1;       ud0x0**i

  // Reference:  page 55

  // 15               : test r1;         ud0x0**i

  // Reference:  page 9

  // 16               : and r2,r1;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 17               : and r3,r1;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 18               : and r0,r2;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 19               : and r1,r2;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 1a               : and r2,r2;       ud0x0**i

  // Reference:  page 55

  // 1a               : test r2;         ud0x0**i

  // Reference:  page 9

  // 1b               : and r3,r2;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 1c               : and r0,r3;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 1d               : and r1,r3;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 1e               : and r2,r3;       ud0x0**i

  // Reference:  page 55
  // Reference:  page 9

  // 1f               : and r3,r3;       ud0x0**i

  // Reference:  page 55

  // 1f               : test r3;         ud0x0**i

  // Reference:  page 57

  // 20               : xor r0,r0;

  // Reference:  page 57

  // 21               : xor r1,r0;

  // Reference:  page 57

  // 22               : xor r2,r0;

  // Reference:  page 57

  // 23               : xor r3,r0;

  // Reference:  page 57

  // 24               : xor r0,r1;

  // Reference:  page 57

  // 25               : xor r1,r1;

  // Reference:  page 57

  // 26               : xor r2,r1;

  // Reference:  page 57

  // 27               : xor r3,r1;

  // Reference:  page 57

  // 28               : xor r0,r2;

  // Reference:  page 57

  // 29               : xor r1,r2;

  // Reference:  page 57

  // 2a               : xor r2,r2;

  // Reference:  page 57

  // 2b               : xor r3,r2;

  // Reference:  page 57

  // 2c               : xor r0,r3;

  // Reference:  page 57

  // 2d               : xor r1,r3;

  // Reference:  page 57

  // 2e               : xor r2,r3;

  // Reference:  page 57

  // 2f               : xor r3,r3;

  // Reference:  page 22

  // 30               : inv r0;          ud0x0**i

  // Reference:  page 40

  // 30               : or r0,r0;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 31               : or r1,r0;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 32               : or r2,r0;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 33               : or r3,r0;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 34               : or r0,r1;        ud0x0**i

  // Reference:  page 22

  // 35               : inv r1;          ud0x0**i

  // Reference:  page 40

  // 35               : or r1,r1;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 36               : or r2,r1;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 37               : or r3,r1;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 38               : or r0,r2;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 39               : or r1,r2;        ud0x0**i

  // Reference:  page 22

  // 3a               : inv r2;          ud0x0**i

  // Reference:  page 40

  // 3a               : or r2,r2;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 3b               : or r3,r2;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 3c               : or r0,r3;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 3d               : or r1,r3;        ud0x0**i

  // Reference:  page 22
  // Reference:  page 40

  // 3e               : or r2,r3;        ud0x0**i

  // Reference:  page 22

  // 3f               : inv r3;          ud0x0**i

  // Reference:  page 40

  // 3f               : or r3,r3;        ud0x0**i

  // Reference:  page 5

  // 40               : add r0,r0;       ud*****i

  // Reference:  page 5

  // 41               : add r1,r0;       ud*****i

  // Reference:  page 5

  // 42               : add r2,r0;       ud*****i

  // Reference:  page 5

  // 43               : add r3,r0;       ud*****i

  // Reference:  page 5

  // 44               : add r0,r1;       ud*****i

  // Reference:  page 5

  // 45               : add r1,r1;       ud*****i

  // Reference:  page 5

  // 46               : add r2,r1;       ud*****i

  // Reference:  page 5

  // 47               : add r3,r1;       ud*****i

  // Reference:  page 5

  // 48               : add r0,r2;       ud*****i

  // Reference:  page 5

  // 49               : add r1,r2;       ud*****i

  // Reference:  page 5

  // 4a               : add r2,r2;       ud*****i

  // Reference:  page 5

  // 4b               : add r3,r2;       ud*****i

  // Reference:  page 5

  // 4c               : add r0,r3;       ud*****i

  // Reference:  page 5

  // 4d               : add r1,r3;       ud*****i

  // Reference:  page 5

  // 4e               : add r2,r3;       ud*****i

  // Reference:  page 5

  // 4f               : add r3,r3;       ud*****i

  // Reference:  page 7

  // 50               : addq r0,#2;      ud*****i

  // Reference:  page 7

  // 51               : addq r1,#2;      ud*****i

  // Reference:  page 7

  // 52               : addq r2,#2;      ud*****i

  // Reference:  page 7

  // 53               : addq r3,#2;      ud*****i

  // Reference:  page 7

  // 54               : addq r0,#1;      ud*****i

  // Reference:  page 7

  // 55               : addq r1,#1;      ud*****i

  // Reference:  page 7

  // 56               : addq r2,#1;      ud*****i

  // Reference:  page 7

  // 57               : addq r3,#1;      ud*****i

  // Reference:  page 7

  // 58               : addq r0,#-2;     ud*****i

  // Reference:  page 7

  // 59               : addq r1,#-2;     ud*****i

  // Reference:  page 7

  // 5a               : addq r2,#-2;     ud*****i

  // Reference:  page 7

  // 5b               : addq r3,#-2;     ud*****i

  // Reference:  page 7

  // 5c               : addq r0,#-1;     ud*****i

  // Reference:  page 7

  // 5d               : addq r1,#-1;     ud*****i

  // Reference:  page 7

  // 5e               : addq r2,#-1;     ud*****i

  // Reference:  page 7

  // 5f               : addq r3,#-1;     ud*****i

  // Reference:  page 37

  // 60               : neg r0;          ud00000i

  // Reference:  page 52

  // 60               : sub r0,r0;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 61               : sub r1,r0;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 62               : sub r2,r0;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 63               : sub r3,r0;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 64               : sub r0,r1;       ud00000i

  // Reference:  page 37

  // 65               : neg r1;          ud00000i

  // Reference:  page 52

  // 65               : sub r1,r1;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 66               : sub r2,r1;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 67               : sub r3,r1;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 68               : sub r0,r2;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 69               : sub r1,r2;       ud00000i

  // Reference:  page 37

  // 6a               : neg r2;          ud00000i

  // Reference:  page 52

  // 6a               : sub r2,r2;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 6b               : sub r3,r2;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 6c               : sub r0,r3;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 6d               : sub r1,r3;       ud00000i

  // Reference:  page 37
  // Reference:  page 52

  // 6e               : sub r2,r3;       ud00000i

  // Reference:  page 37

  // 6f               : neg r3;          ud00000i

  // Reference:  page 52

  // 6f               : sub r3,r3;       ud00000i

  // Reference:  page 4

  // 70               : abs r0;          ud*****i

  // Reference:  page 19

  // 70               : cmp r0,r0;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 71               : cmp r1,r0;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 72               : cmp r2,r0;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 73               : cmp r3,r0;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 74               : cmp r0,r1;       ud*x***i

  // Reference:  page 4

  // 75               : abs r1;          ud*****i

  // Reference:  page 19

  // 75               : cmp r1,r1;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 76               : cmp r2,r1;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 77               : cmp r3,r1;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 78               : cmp r0,r2;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 79               : cmp r1,r2;       ud*x***i

  // Reference:  page 4

  // 7a               : abs r2;          ud*****i

  // Reference:  page 19

  // 7a               : cmp r2,r2;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 7b               : cmp r3,r2;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 7c               : cmp r0,r3;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 7d               : cmp r1,r3;       ud*x***i

  // Reference:  page 4
  // Reference:  page 19

  // 7e               : cmp r2,r3;       ud*x***i

  // Reference:  page 4

  // 7f               : abs r3;          ud*****i

  // Reference:  page 19

  // 7f               : cmp r3,r3;       ud*x***i

  // Reference:  page 28

  // 80               : ld.w r0,(r2);    ud0x0**i

  // Reference:  page 28

  // 81               : ld.w r1,(r2);    ud0x0**i

  // Reference:  page 28

  // 82               : ld.w r0,(r3);    ud0x0**i

  // Reference:  page 28

  // 83               : ld.w r1,(r3);    ud0x0**i

  // Reference:  page 28

  // 84               : ld.b r0,(r2);    ud0x0**i

  // Reference:  page 28

  // 85               : ld.b r1,(r2);    ud0x0**i

  // Reference:  page 28

  // 86               : ld.b r0,(r3);    ud0x0**i

  // Reference:  page 28

  // 87               : ld.b r1,(r3);    ud0x0**i

  // Reference:  page 28

  // 88               : st.w (r2),r0;    ud0x0**i

  // Reference:  page 28

  // 89               : st.w (r2),r1;    ud0x0**i

  // Reference:  page 28

  // 8a               : st.w (r3),r0;    ud0x0**i

  // Reference:  page 28

  // 8b               : st.w (r3),r1;    ud0x0**i

  // Reference:  page 28

  // 8c               : st.b (r2),r0;    ud0x0**i

  // Reference:  page 28

  // 8d               : st.b (r2),r1;    ud0x0**i

  // Reference:  page 28

  // 8e               : st.b (r3),r0;    ud0x0**i

  // Reference:  page 28

  // 8f               : st.b (r3),r1;    ud0x0**i

  // Reference:  page 29

  // 90               : ld.w r0,(r2++);  ud0x0**i

  // Reference:  page 29

  // 91               : ld.w r1,(r2++);  ud0x0**i

  // Reference:  page 29

  // 92               : ld.w r0,(r3++);  ud0x0**i

  // Reference:  page 29

  // 93               : ld.w r1,(r3++);  ud0x0**i

  // Reference:  page 29

  // 94               : ld.b r0,(r2++);  ud0x0**i

  // Reference:  page 29

  // 95               : ld.b r1,(r2++);  ud0x0**i

  // Reference:  page 29

  // 96               : ld.b r0,(r3++);  ud0x0**i

  // Reference:  page 29

  // 97               : ld.b r1,(r3++);  ud0x0**i

  // Reference:  page 29

  // 98               : st.w (r2++),r0;  ud0x0**i

  // Reference:  page 29

  // 99               : st.w (r2++),r1;  ud0x0**i

  // Reference:  page 29

  // 9a               : st.w (r3++),r0;  ud0x0**i

  // Reference:  page 29

  // 9b               : st.w (r3++),r1;  ud0x0**i

  // Reference:  page 29

  // 9c               : st.b (r2++),r0;  ud0x0**i

  // Reference:  page 29

  // 9d               : st.b (r2++),r1;  ud0x0**i

  // Reference:  page 29

  // 9e               : st.b (r3++),r0;  ud0x0**i

  // Reference:  page 29

  // 9f               : st.b (r3++),r1;  ud0x0**i

  // Reference:  page 30

  // a0 nnnnnn        : ld.w r0, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a1 nnnnnn        : ld.w r1, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a2 nnnnnn        : ld.w r2, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a3 nnnnnn        : ld.w r3, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a4 nnnnnn        : ld.b r0, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a5 nnnnnn        : ld.b r1, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a6 nnnnnn        : ld.b r2, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a7 nnnnnn        : ld.b r3, (SP,nn);ud0x0**i

  // Reference:  page 30

  // a8 nnnnnn        : st.w (SP,nn), r0;ud0x0**i

  // Reference:  page 30

  // a9 nnnnnn        : st.w (SP,nn), r1;ud0x0**i

  // Reference:  page 30

  // aa nnnnnn        : st.w (SP,nn), r2;ud0x0**i

  // Reference:  page 30

  // ab nnnnnn        : st.w (SP,nn), r3;ud0x0**i

  // Reference:  page 30

  // ac nnnnnn        : st.b (SP,nn), r0;ud0x0**i

  // Reference:  page 30

  // ad nnnnnn        : st.b (SP,nn), r1;ud0x0**i

  // Reference:  page 30

  // ae nnnnnn        : st.b (SP,nn), r2;ud0x0**i

  // Reference:  page 30

  // af nnnnnn        : st.b (SP,nn), r3;ud0x0**i

  // Reference:  page 31

  // b0 nnnnnnnn      : ld.w r0,nnnn;    ud0x0**i

  // Reference:  page 31

  // b1 nnnnnnnn      : ld.w r1,nnnn;    ud0x0**i

  // Reference:  page 31

  // b2 nnnnnnnn      : ld.w r2,nnnn;    ud0x0**i

  // Reference:  page 31

  // b3 nnnnnnnn      : ld.w r3,nnnn;    ud0x0**i

  // Reference:  page 31

  // b4 nnnnnnnn      : ld.b r0,nnnn;    ud0x0**i

  // Reference:  page 31

  // b5 nnnnnnnn      : ld.b r1,nnnn;    ud0x0**i

  // Reference:  page 31

  // b6 nnnnnnnn      : ld.b r2,nnnn;    ud0x0**i

  // Reference:  page 31

  // b7 nnnnnnnn      : ld.b r3,nnnn;    ud0x0**i

  // Reference:  page 31

  // b8 nnnnnnnn      : st.w nnnn, r0;   ud0x0**i

  // Reference:  page 31

  // b9 nnnnnnnn      : st.w nnnn, r1;   ud0x0**i

  // Reference:  page 31

  // ba nnnnnnnn      : st.w nnnn, r2;   ud0x0**i

  // Reference:  page 31

  // bb nnnnnnnn      : st.w nnnn, r3;   ud0x0**i

  // Reference:  page 31

  // bc nnnnnnnn      : st.b nnnn,r0;    ud0x0**i

  // Reference:  page 31

  // bd nnnnnnnn      : st.b nnnn,r1;    ud0x0**i

  // Reference:  page 31

  // be nnnnnnnn      : st.b nnnn,r2;    ud0x0**i

  // Reference:  page 31

  // bf nnnnnnnn      : st.b nnnn,r3;    ud0x0**i

  // Reference:  page 42

  // c0               : pop r0;

  // Reference:  page 42

  // c1               : pop r1;

  // Reference:  page 42

  // c2               : pop r2;

  // Reference:  page 42

  // c3               : pop r3;

  // Reference:  page 42

  // c4               : pop PS;

  // Unknown: c5
  // Reference:  page 44

  // c6               : ret;

  // Reference:  page 45

  // c7               : reti;            ud******

  // Reference:  page 42

  // c8               : push r0;

  // Reference:  page 42

  // c9               : push r1;

  // Reference:  page 42

  // ca               : push r2;

  // Reference:  page 42

  // cb               : push r3;

  // Reference:  page 42

  // cc               : push PS;

  // Reference:  page 56

  // cd               : trap;            udcxvzn0

  // Reference:  page 25

  // ce               : jsr (r0);

  // Reference:  page 26

  // cf nnnnnnnnnnnn  : jsr nnnn;

  // Reference:  page 39

  // cf               : pushpop;

  // Reference:  page 27

  // d0 nnnnnnnn      : ld.w r0,#nnnn;   ud0x0**i

  // Reference:  page 27

  // d1 nnnnnnnn      : ld.w r1,#nnnn;   ud0x0**i

  // Reference:  page 27

  // d2 nnnnnnnn      : ld.w r2,#nnnn;   ud0x0**i

  // Reference:  page 27

  // d3 nnnnnnnn      : ld.w r3,#nnnn;   ud0x0**i

  // Reference:  page 27

  // d4 nnnn          : ld.b r0, #nn;    ud0x0**i

  // Reference:  page 27

  // d5 nnnn          : ld.b r1, #nn;    ud0x0**i

  // Reference:  page 27

  // d6 nnnn          : ld.b r2, #nn;    ud0x0**i

  // Reference:  page 27

  // d7 nnnn          : ld.b r3, #nn;    ud0x0**i

  // Reference:  page 32
  // Reference: This is all shifts, logical and arithmetic
  // ext
  // d8 
  // Reference:  page 32
  // Reference: This is all shifts, logical and arithmetic
  // ext
  // d9 
  // Reference:  page 32
  // Reference: This is all shifts, logical and arithmetic
  // ext
  // da 
  // Reference:  page 32
  // Reference: This is all shifts, logical and arithmetic
  // ext
  // db 
  // Reference:  page 15
  // ext
  // dc 
  // Reference:  page 15
  // ext
  // dd 
  // Reference:  page 15
  // ext
  // de 
  // Reference:  page 15
  // ext
  // df 
  // Unknown: e0
  // Reference:  page 13

  // e1 nn            : buc nn;

  // Reference:  page 13

  // e1 nn            : bus nn;

  // Reference:  page 13

  // e2 nn            : bhi nn;

  // Reference:  page 13

  // e3 nn            : blo nn;

  // Reference:  page 13

  // e4 nn            : bcc nn;

  // Reference:  page 13

  // e5 nn            : bcs nn;

  // Reference:  page 13

  // e6 nn            : bne nn;

  // Reference:  page 13

  // e7 nn            : beq nn;

  // Reference:  page 13

  // e8 nn            : bvc nn;

  // Reference:  page 13

  // e9 nn            : bvs nn;

  // Reference:  page 13

  // ea nn            : bpl nn;

  // Reference:  page 13

  // eb nn            : bmi nn;

  // Reference:  page 13

  // ec nn            : bge nn;

  // Reference:  page 13

  // ed nn            : blt nn;

  // Reference:  page 13

  // ee nn            : bgt nn;

  // Reference:  page 13

  // ef nn            : ble nn;

  // Reference:  page 35

  // f0               : move r0,sp;

  // Reference:  page 35

  // f1               : move sp,r0;

  // Reference:  page 23

  // f2               : JMP (r0);

  // Reference:  page 24

  // f3 nnnn          : JMP nnnn;

  // Reference:  page 9

  // f4 nn            : and PS,nn;       ud******

  // Reference:  page 41

  // f5 n             : or PS,#n;        ud******

  // Reference:  page 6

  // f6 nn            : add sp,#n;       ud*****i

  // Reference:  page 50

  // f7               : sqrt;            ud00000i

  // Reference:  page 35

  // f8               : mulu;            ud00000i

  // Reference:  page 35

  // f9               : muls;            ud00000i

  // Reference:  page 20

  // fa               : div.u;           ud00000i

  // Reference:  page 20

  // fb               : div.s;           ud00000i

  // Reference:  page 8

  // fc               : addx r0,r1;      ud*****i

  // Reference:  page 53

  // fd               : subx r0,r1;      ud00000i

  // Reference:  page 38

  // fe               : negx r0;         ud00000i

  // Reference:  page 39

  // ff               : NOP;

  // Reference:  page 32

  // 00 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 01 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 02 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 03 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 04 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 05 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 06 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 07 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 08 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 09 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 0a nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 0b nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 0c nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 0d nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 0e nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 0f nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 10 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 11 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 12 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 13 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 14 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 15 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 16 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 17 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 18 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 19 nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 1a nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 1b nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 1c nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 1d nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 1e nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 1f nn            : lsl @r,#n-16     ud*****i

  // Reference:  page 32

  // 20               : lsl @r,r0        ud*****i

  // Reference:  page 32

  // 21               : lsl @r,r1        ud*****i

  // Reference:  page 32

  // 22               : lsl @r,r2        ud*****i

  // Reference:  page 32

  // 23               : lsl @r,r3        ud*****i

  // Unknown: 24
  // Unknown: 25
  // Unknown: 26
  // Unknown: 27
  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 28               : lsl.wt @r,r0     ud*00*0i

  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 29               : lsl.wt @r,r1     ud*00*0i

  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 2a               : lsl.wt @r,r2     ud*00*0i

  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 2b               : lsl.wt @r,r3     ud*00*0i

  // Unknown: 2c
  // Unknown: 2d
  // Unknown: 2e
  // Unknown: 2f
  // Reference:  page 32

  // 30               : lsr @r,r0        ud*****i

  // Reference:  page 32

  // 31               : lsr @r,r1        ud*****i

  // Reference:  page 32

  // 32               : lsr @r,r2        ud*****i

  // Reference:  page 32

  // 33               : lsr @r,r3        ud*****i

  // Unknown: 34
  // Unknown: 35
  // Unknown: 36
  // Unknown: 37
  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 38               : lsr.wt @r,r0     ud*00*0i

  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 39               : lsr.wt @r,r1     ud*00*0i

  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 3a               : lsr.wt @r,r2     ud*00*0i

  // Reference:  page 32
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 3b               : lsr.wt @r,r3     ud*00*0i

  // Unknown: 3c
  // Unknown: 3d
  // Unknown: 3e
  // Unknown: 3f
  // Reference:  page 11

  // 40 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 41 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 42 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 43 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 44 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 45 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 46 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 47 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 48 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 49 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 4a nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 4b nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 4c nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 4d nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 4e nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 4f nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 50 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 51 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 52 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 53 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 54 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 55 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 56 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 57 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 58 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 59 nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 5a nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 5b nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 5c nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 5d nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 5e nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 5f nn            : asl @r,#n-16     ud*****i

  // Reference:  page 11

  // 60               : asl @r,r0        ud*****i

  // Reference:  page 11

  // 61               : asl @r,r1        ud*****i

  // Reference:  page 11

  // 62               : asl @r,r2        ud*****i

  // Reference:  page 11

  // 63               : asl @r,r3        ud*****i

  // Unknown: 64
  // Unknown: 65
  // Unknown: 66
  // Unknown: 67
  // Reference:  page 11
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 68               : asl.wt @r,r0     ud*00*0i

  // Reference:  page 11
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 69               : asl.wt @r,r1     ud*00*0i

  // Reference:  page 11
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 6a               : asl.wt @r,r2     ud*00*0i

  // Reference:  page 11
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 6b               : asl.wt @r,r3     ud*00*0i

  // Unknown: 6c
  // Unknown: 6d
  // Unknown: 6e
  // Unknown: 6f
  // Reference:  page 11

  // 70               : asr @r,r0        ud*****i

  // Reference:  page 11

  // 71               : asr @r,r1        ud*****i

  // Reference:  page 11

  // 72               : asr @r,r2        ud*****i

  // Reference:  page 11

  // 73               : asr @r,r3        ud*****i

  // Unknown: 74
  // Unknown: 75
  // Unknown: 76
  // Unknown: 77
  // Reference:  page 1
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 78               : asr.wt @r,r0     ud*00*0i

  // Reference:  page 1
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 79               : asr.wt @r,r1     ud*00*0i

  // Reference:  page 1
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 7a               : asr.wt @r,r2     ud*00*0i

  // Reference:  page 1
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // 7b               : asr.wt @r,r3     ud*00*0i

  // Unknown: 7c
  // Unknown: 7d
  // Unknown: 7e
  // Unknown: 7f
  // Reference:  page 46

  // 80 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 81 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 82 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 83 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 84 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 85 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 86 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 87 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 88 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 89 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 8a nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 8b nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 8c nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 8d nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 8e nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 8f nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 90 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 91 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 92 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 93 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 94 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 95 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 96 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 97 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 98 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 99 nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 9a nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 9b nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 9c nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 9d nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 9e nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // 9f nn            : rol @r,#n-16     ud*****i

  // Reference:  page 46

  // a0               : rol @r,r0        ud*****i

  // Reference:  page 46

  // a1               : rol @r,r1        ud*****i

  // Reference:  page 46

  // a2               : rol @r,r2        ud*****i

  // Reference:  page 46

  // a3               : rol @r,r3        ud*****i

  // Unknown: a4
  // Unknown: a5
  // Unknown: a6
  // Unknown: a7
  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // a8               : rol.wt @r,r0     ud*00*0i

  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // a9               : rol.wt @r,r1     ud*00*0i

  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // aa               : rol.wt @r,r2     ud*00*0i

  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // ab               : rol.wt @r,r3     ud*00*0i

  // Unknown: ac
  // Unknown: ad
  // Unknown: ae
  // Unknown: af
  // Reference:  page 46

  // b0               : ror @r,r0        ud*****i

  // Reference:  page 46

  // b1               : ror @r,r1        ud*****i

  // Reference:  page 46

  // b2               : ror @r,r2        ud*****i

  // Reference:  page 46

  // b3               : ror @r,r3        ud*****i

  // Unknown: b4
  // Unknown: b5
  // Unknown: b6
  // Unknown: b7
  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // b8               : ror.wt @r,r0     ud*00*0i

  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // b9               : ror.wt @r,r1     ud*00*0i

  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // ba               : ror.wt @r,r2     ud*00*0i

  // Reference:  page 46
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // bb               : ror.wt @r,r3     ud*00*0i

  // Unknown: bc
  // Unknown: bd
  // Unknown: be
  // Unknown: bf
  // Reference:  page 48

  // c0 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c1 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c2 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c3 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c4 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c5 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c6 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c7 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c8 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // c9 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // ca nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // cb nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // cc nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // cd nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // ce nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // cf nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d0 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d1 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d2 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d3 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d4 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d5 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d6 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d7 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d8 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // d9 nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // da nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // db nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // dc nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // dd nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // de nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // df nn            : roxl @r,#n-16    ud*****i

  // Reference:  page 48

  // e0               : roxl @r,r0       ud*****i

  // Reference:  page 48

  // e1               : roxl @r,r1       ud*****i

  // Reference:  page 48

  // e2               : roxl @r,r2       ud*****i

  // Reference:  page 48

  // e3               : roxl @r,r3       ud*****i

  // Unknown: e4
  // Unknown: e5
  // Unknown: e6
  // Unknown: e7
  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // e8               : roxl.wt @r,r0    ud*00*0i

  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // e9               : roxl.wt @r,r1    ud*00*0i

  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // ea               : roxl.wt @r,r2    ud*00*0i

  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // eb               : roxl.wt @r,r3    ud*00*0i

  // Unknown: ec
  // Unknown: ed
  // Unknown: ee
  // Unknown: ef
  // Reference:  page 48

  // f0               : roxr @r,r0       ud*****i

  // Reference:  page 48

  // f1               : roxr @r,r1       ud*****i

  // Reference:  page 48

  // f2               : roxr @r,r2       ud*****i

  // Reference:  page 48

  // f3               : roxr @r,r3       ud*****i

  // Unknown: f4
  // Unknown: f5
  // Unknown: f6
  // Unknown: f7
  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // f8               : roxr.wt @r,r0    ud*00*0i

  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // f9               : roxr.wt @r,r1    ud*00*0i

  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // fa               : roxr.wt @r,r2    ud*00*0i

  // Reference:  page 48
  // Reference: Weighted stores the number of 1 bits shifted out into RA

  // fb               : roxr.wt @r,r3    ud*00*0i

  // Unknown: fc
  // Unknown: fd
  // Unknown: fe
  // Unknown: ff
  // Reference:  page 16

  // 00 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 01 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 02 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 03 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 04 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 05 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 06 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 07 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 08 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 09 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 0a nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 0b nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 0c nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 0d nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 0e nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 0f nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 10 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 11 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 12 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 13 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 14 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 15 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 16 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 17 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 18 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 19 nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 1a nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 1b nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 1c nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 1d nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 1e nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 1f nn            : btst @r,#n       udcxv*ni

  // Reference:  page 16

  // 20               : btst @r,r0       udcxv*ni

  // Reference:  page 16

  // 21               : btst @r,r1       udcxv*ni

  // Reference:  page 16

  // 22               : btst @r,r2       udcxv*ni

  // Reference:  page 16

  // 23               : btst @r,r3       udcxv*ni

  // Unknown: 24
  // Unknown: 25
  // Unknown: 26
  // Unknown: 27
  // Unknown: 28
  // Unknown: 29
  // Unknown: 2a
  // Unknown: 2b
  // Unknown: 2c
  // Unknown: 2d
  // Unknown: 2e
  // Unknown: 2f
  // Unknown: 30
  // Unknown: 31
  // Unknown: 32
  // Unknown: 33
  // Unknown: 34
  // Unknown: 35
  // Unknown: 36
  // Unknown: 37
  // Unknown: 38
  // Unknown: 39
  // Unknown: 3a
  // Unknown: 3b
  // Unknown: 3c
  // Unknown: 3d
  // Unknown: 3e
  // Unknown: 3f
  // Reference:  page 15

  // 40 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 41 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 42 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 43 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 44 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 45 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 46 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 47 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 48 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 49 nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 4a nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 4b nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 4c nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 4d nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 4e nn            : bchg @r,#n       udcxv*ni

  // Reference:  page 15

  // 4f nn            : bchg @r,#n       udcxv*ni

  // Unknown: 50
  // Unknown: 51
  // Unknown: 52
  // Unknown: 53
  // Unknown: 54
  // Unknown: 55
  // Unknown: 56
  // Unknown: 57
  // Unknown: 58
  // Unknown: 59
  // Unknown: 5a
  // Unknown: 5b
  // Unknown: 5c
  // Unknown: 5d
  // Unknown: 5e
  // Unknown: 5f
  // Reference:  page 15

  // 60               : bchg @r,r0       udcxv*ni

  // Reference:  page 15

  // 61               : bchg @r,r1       udcxv*ni

  // Reference:  page 15

  // 62               : bchg @r,r2       udcxv*ni

  // Reference:  page 15

  // 63               : bchg @r,r3       udcxv*ni

  // Unknown: 64
  // Unknown: 65
  // Unknown: 66
  // Unknown: 67
  // Unknown: 68
  // Unknown: 69
  // Unknown: 6a
  // Unknown: 6b
  // Unknown: 6c
  // Unknown: 6d
  // Unknown: 6e
  // Unknown: 6f
  // Unknown: 70
  // Unknown: 71
  // Unknown: 72
  // Unknown: 73
  // Unknown: 74
  // Unknown: 75
  // Unknown: 76
  // Unknown: 77
  // Unknown: 78
  // Unknown: 79
  // Unknown: 7a
  // Unknown: 7b
  // Unknown: 7c
  // Unknown: 7d
  // Unknown: 7e
  // Unknown: 7f
  // Reference:  page 16

  // 80 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 81 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 82 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 83 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 84 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 85 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 86 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 87 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 88 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 89 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 8a nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 8b nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 8c nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 8d nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 8e nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 8f nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 90 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 91 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 92 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 93 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 94 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 95 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 96 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 97 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 98 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 99 nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 9a nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 9b nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 9c nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 9d nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 9e nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // 9f nn            : bclr @r,#n       udcxv*ni

  // Reference:  page 16

  // a0               : bclr @r,r0       udcxv*ni

  // Reference:  page 16

  // a1               : bclr @r,r1       udcxv*ni

  // Reference:  page 16

  // a2               : bclr @r,r2       udcxv*ni

  // Reference:  page 16

  // a3               : bclr @r,r3       udcxv*ni

  // Unknown: a4
  // Unknown: a5
  // Unknown: a6
  // Unknown: a7
  // Unknown: a8
  // Unknown: a9
  // Unknown: aa
  // Unknown: ab
  // Unknown: ac
  // Unknown: ad
  // Unknown: ae
  // Unknown: af
  // Unknown: b0
  // Unknown: b1
  // Unknown: b2
  // Unknown: b3
  // Unknown: b4
  // Unknown: b5
  // Unknown: b6
  // Unknown: b7
  // Unknown: b8
  // Unknown: b9
  // Unknown: ba
  // Unknown: bb
  // Unknown: bc
  // Unknown: bd
  // Unknown: be
  // Unknown: bf
  // Reference:  page 16

  // c0 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c1 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c2 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c3 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c4 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c5 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c6 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c7 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c8 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // c9 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // ca nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // cb nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // cc nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // cd nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // ce nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // cf nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d0 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d1 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d2 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d3 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d4 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d5 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d6 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d7 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d8 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // d9 nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // da nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // db nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // dc nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // dd nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // de nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // df nn            : bset @r,#n       udcxv*ni

  // Reference:  page 16

  // e0               : bset @r,r0       udcxv*ni

  // Reference:  page 16

  // e1               : bset @r,r1       udcxv*ni

  // Reference:  page 16

  // e2               : bset @r,r2       udcxv*ni

  // Reference:  page 16

  // e3               : bset @r,r3       udcxv*ni

  // Unknown: e4
  // Unknown: e5
  // Unknown: e6
  // Unknown: e7
  // Unknown: e8
  // Unknown: e9
  // Unknown: ea
  // Unknown: eb
  // Unknown: ec
  // Unknown: ed
  // Unknown: ee
  // Unknown: ef
  // Unknown: f0
  // Unknown: f1
  // Unknown: f2
  // Unknown: f3
  // Unknown: f4
  // Unknown: f5
  // Unknown: f6
  // Unknown: f7
  // Unknown: f8
  // Unknown: f9
  // Unknown: fa
  // Unknown: fb
  // Unknown: fc
  // Unknown: fd
  // Unknown: fe
  // Unknown: ff
});