describe('Lyrics search service', function() {
  var $httpBackend, lyricsService;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, _lyricsService_) {
    $httpBackend = _$httpBackend_;
    lyricsService = _lyricsService_;
  }));

  it('should contain a promise', function() {
    $httpBackend.expect('GET', 'http://localhost:4730?query=foo').respond([]);
    var promise = lyricsService.getLyrics('foo');
    $httpBackend.flush();
    expect(promise).to.have.property('then');
  });
});