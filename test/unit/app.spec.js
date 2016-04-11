describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        it('should return vowels in non-palindrome word', function () {
            expect(app.generateMessage('hejka')).toEqual({vowel: 3, palindrome: false});
            expect(app.generateMessage('majowo')).toEqual({vowel: 4, palindrome: false});
        });
        it('should count vowels in palindrome', function () {
            expect(app.generateMessage('ola')).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage('juz')).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage('bobek')).toEqual({vowel: 1, palindrome: true});
        });
        it('should thrown an error message', function () {
            expect(function () {
                app.generateMessage('')
            }).toThrowError('Empty string!');
        });
    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.isPalindrome('ola');
            });
            it('should call isPalindrome function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage('stok');
            });
            it('should call isPalindrome and vowelCount functions when generateMessage function is called', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('stok');
            });
        });

        describe('and.returnValue', function () {
            var returns;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call generateMessage and return value {2, true}', function () {
                returns = app.generateMessage('zium');
                expect(returns).toEqual({vowel: 2, palindrome: true});
            });
            it('should call isPalindrome and vowelCount should return true and 2', function () {
                returns = app.isPalindrome('ola');
                expect(returns).toEqual(true);
            });
        });

        describe('and.callFake', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function () {
                    return 'FAKE isPalindrome FUNCTION'
                });
            });
            it('should call isPalindrome fake function', function () {
                expect(app.isPalindrome('tatata')).toEqual('FAKE isPalindrome FUNCTION');
            });
            it('should notice isPalindrome called second time when generateMessage called', function () {
                expect(app.generateMessage('ola')).toEqual({vowel: 2, palindrome: 'FAKE isPalindrome FUNCTION'});
            });
        });

        describe('calls.count()', function () {
            var returns;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should call isPalindrome function', function () {
                returns = app.isPalindrome('ola');
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice isPalindrome called second time when generateMessage called', function () {
                returns = app.generateMessage('zium');
                expect(app.isPalindrome.calls.count()).toBe(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount');
                app.vowelCount('ola');
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
                app.generateMessage('stok');
            });
            it('should call vowelCount and vowelCount functions when generateMessage function is called', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('stok');
            });
        });

        describe('and.returnValue', function () {
            var returns;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.returnValue(2);
            });
            it('should call generateMessage and return value {2, true}', function () {
                returns = app.generateMessage('juz');
                expect(returns).toEqual({vowel: 2, palindrome: true});
            });
            it('should call vowelCount and should return 2', function () {
                returns = app.vowelCount('juz');
                expect(returns).toEqual(2);
            });
        });

        describe('and.callFake', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callFake(function () {
                    return 99999;
                });
            });
            it('should return vowelCount with 99999', function () {
                expect(app.vowelCount('qaz')).toEqual(99999);
            });
            it('should notice vowelCount called second time when generateMessage called', function () {
                expect(app.generateMessage('ola')).toEqual({vowel: 99999, palindrome: true});
            });
        });

        describe('calls.count()', function () {
            var returns;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
            });
            it('should call vowelCount function', function () {
                returns = app.vowelCount('ola');
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice vowelCount called second time when generateMessage called', function () {
                returns = app.generateMessage('tatata');
                expect(app.vowelCount.calls.count()).toBe(2);
            });
            it('should notice vowelCount called third time when generateMessage is called second time', function () {
                returns = app.generateMessage('zium');
                expect(app.vowelCount.calls.count()).toBe(3);
            });

        });
    });
});